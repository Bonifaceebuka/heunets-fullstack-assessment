import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import winston, { format } from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';

const IS_PRODUCTION = process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production" ? true : false;
const { combine, errors, colorize, printf, timestamp } = format;
import { hostname } from "os";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const transports = {
    console: new winston.transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),

            colorize({
                colors: {
                    info: 'cyan',
                    log: 'green',
                    warn: 'yellow',
                    debug: 'magenta',
                    error: 'red'
                }
            }),
            printf(info => {
                return `${info.timestamp} [${info.level}] [${info.context ? info.context : info.stack}] ${
                    info.message ||
                    JSON.stringify({
                        ...info,
                        timestamp: undefined,
                        context: undefined,
                        level: undefined,
                        stack: undefined
                    })
                }`;
            })
        )
    }),
    combinedFile: new DailyRotateFile({
        dirname: `logs/${hostname}/combined`,
        filename: 'combined',
        extension: '.log',
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    }),
    errorFile: new DailyRotateFile({
        dirname: `logs/${hostname}/error`,
        filename: 'error',
        extension: '.log',
        level: 'error',
        format: winston.format.combine(winston.format.errors({ stack: process.env.NODE_ENV !== 'production' }))
    })
};

async function bootstrap(): Promise<void> {
 const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  const logger = WinstonModule.createLogger({
      transports: [transports.console, transports.combinedFile, transports.errorFile]
  });

  app.useLogger(logger);
  app.enableVersioning({
        type: VersioningType.URI
    });

    if (!IS_PRODUCTION) {
        const options = new DocumentBuilder()
            .setTitle(`Heunets Backend REST API`)
            .setLicense('© Heunets', 'heunets.com/')
            .setDescription('The Heunets REST API description')
            .setVersion("0.0.1")
            .addTag('auth')
            .addTag('user')
            // .addServer('https')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('swagger/api', app, document);
    }
  const port = Number(process.env.PORT ?? 3033);
  await app.listen(port, () => {
      logger.log(`app running on port ${port}`, 'Heunets API service');
  });
}

bootstrap();
