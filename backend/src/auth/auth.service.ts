import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.respository';
import { UserSignupInputsDto } from './dtos/signup-input.dto';
import { ServiceResponseDTO } from 'src/shared/types/Ihttp.response';
import { UserSigninInputsDto } from './dtos/signin-input.dto';
import bcrypt from "bcryptjs";
import { AppError } from 'src/shared/handlers/errors/AppError';
import { dynamic_messages } from 'src/shared/constants/messages';
import { CustomConfigService } from 'src/shared/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { USER_MESSAGES } from './constants/user.messages';
import { JwtPayload } from './strategies/jwt-payload';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: CustomConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async registerUser(userSignupInputsDto: UserSignupInputsDto): Promise<ServiceResponseDTO> {
    const { email, full_name, password } = userSignupInputsDto;
    const userEmail = email.toLowerCase();
    let message;
    const hashedPassword = await this.hashString(password);

    const foundUser = await this.userRepository.findOne({
      email: userEmail
    });

    if (foundUser) {
      message = dynamic_messages.ALREADY_EXISTS("User")
      this.logger.error(message)
      throw new AppError(message);
    }

    const user = await this.userRepository.create({
      email: userEmail,
      password: hashedPassword,
      full_name
    });

    this.logger.log(`User account created successfully with : ${JSON.stringify(userSignupInputsDto)}`)
    return {
      successful: true,
      data: {
        id: user?._id,
        full_name: user?.full_name
      },
      message: "Your account was created successfully!"
    };
  }

  private async compareHash(
    input: string,
    hashed: string
  ): Promise<boolean> {
    if (!input || !hashed) return false;

    const appKey = this.configService.getAppEnv().APP_KEY_SECRET

    const combinedInput = input + appKey;

    return await bcrypt.compare(combinedInput, hashed);
  }

  private async hashString(
    input: string,
  ): Promise<string> {
    if (!input) {
      const message = "Input to be hashed is required";
      this.logger.error(message)
      throw new AppError(message)
    }

    const adminKey = this.configService.getAppEnv().APP_KEY_SECRET
    const combinedInput = input + adminKey;

    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(combinedInput, salt);

    return hashedString;
  }

  public async getToken(jwtPayload: JwtPayload): Promise<string> {
    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.getAppEnv().JWT_SECRET
    });
    return token;
  }

  async loginUser(userSigninInputsDto: UserSigninInputsDto): Promise<ServiceResponseDTO> {
    const { password, email } = userSigninInputsDto;
    const userEmail = email.toLowerCase();
    let message;
    const foundUser = await this.userRepository.findOne({
      email: userEmail
    });

    if (!foundUser) {
      message = dynamic_messages.NOT_FOUND("User")
      this.logger.error(message)
      throw new AppError(message, 404);
    }
    const isMatch = await this.compareHash(
      password,
      foundUser.password
    );

    if (!isMatch) {
      message = USER_MESSAGES.ACCOUNT.INVALID_CREDENTIALS
      this.logger.error(message)
      throw new AppError(message,
        400
      );
    }
    const token = await this.getToken({ email: foundUser.email, sub: foundUser._id.toString() });

    if (!token) {
      message = 'Error trying to complete JWT generation process';
      this.logger.error(message)
      throw new AppError(message);
    }

    message = USER_MESSAGES.AUTH.LOGIN.LOGIN_SUCCESSFUL
    return {
      data: {
        access_token: token,
        user: {
          email: foundUser.email,
          full_name: foundUser.full_name
        }
      },
      successful: true,
      message
    }
  }

  async fetchUsers(): Promise<ServiceResponseDTO> {
    const users = await this.userRepository.findMany({})
    return {
      data: users,
      successful: true,
      message: "Users fetched successfully!"
    }
  }
}
