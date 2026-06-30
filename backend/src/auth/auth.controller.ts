import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { UserSignupInputsDto } from './dtos/signup-input.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { HttpResponseDTO } from 'src/shared/types/Ihttp.response';
import { UserSigninInputsDto } from './dtos/signin-input.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller({ version: '1', path: 'authentication' })
@ApiTags('Authentication')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

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

    @ApiOperation({ summary: 'User login' })
    @Post('/login')
    async userLogin(@Body() userSigninInputsDto: UserSigninInputsDto) {
       const response = await this.authService.loginUser(userSigninInputsDto)
       return {
            status_code: 200,
            data: response?.data,
            message: response?.message
        }
    }

    @ApiOperation({ summary: 'Fetch registered users' })
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get('/users')
    async fetchUsers() {
       const response = await this.authService.fetchUsers()
       return {
            status_code: 200,
            data: response?.data,
            message: response?.message
        }
    }
}
