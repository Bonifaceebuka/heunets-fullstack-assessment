import {Body, Controller, Get, Post, Put, Param, UseGuards, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { UserSignupInputsDto } from './dtos/signup-input.dto';
import {
    ApiBearerAuth, ApiBody, ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HttpResponseDTO } from 'src/shared/types/Ihttp.response';

@Controller({ version: '1' })
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @ApiTags('Authentication')
    @ApiOperation({ summary: 'Register new user' })
    @Post('/register')
    async userRegiser(@Body() userSignupInputsDto: UserSignupInputsDto): Promise<HttpResponseDTO> {
        const response = await this.authService.registerUser(userSignupInputsDto);
        return {
            status_code: 201,
            data: response?.data,
            message: response?.message
        }
    }

    // @ApiTags('Authentication')
    // @ApiResponse({ type: LoginResponse })
    // @ApiOperation({ summary: 'User login' })
    // @Post('/login')
    // async userLogin(@Body() loginUserInput: LoginUserInputs) {
    //     return this.authService.generateCandidateSummary(user, dto)
    // }
}
