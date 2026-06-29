import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HttpResponseDTO } from './shared/types/Ihttp.response';

@Controller()
export class AppController {

    @ApiOperation({ summary: 'Test server' })
    @Get("/")
    getHello(): HttpResponseDTO {
        return {
            status_code: 200,
            data: "",
            message: "Server is running"
        }
    }
}
