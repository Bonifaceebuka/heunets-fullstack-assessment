import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../handlers/errors/AppError';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    if (Array.isArray(exception)) {
      return response.status(422).json({
        successful: false,
        message: 'Form validation failed',
        status_code: 422,
        data: exception.map((e) => ({
          field: e.property,
          errors: Object.values(e.constraints ?? {}),
        })),
      });
    }

    if (exception instanceof AppError) {
      this.logger.error(exception);

      return response.status(exception.statusCode).json({
        status_code: exception.statusCode,
        message: exception.message,
        data: exception.data ?? null,
      });
    }

    this.logger.error(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status_code: 500,
      message:
        exception instanceof Error
          ? exception.message
          : "Internal server error!",
      data: null,
    });
  }
}