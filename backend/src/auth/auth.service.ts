import { randomUUID } from 'crypto';

import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.respository';
import { UserSignupInputsDto } from './dtos/signup-input.dto';
import { ServiceResponseDTO } from 'src/shared/types/Ihttp.response';

@Injectable()
export class AuthService {
    private readonly logger: Logger;
  constructor(
    private readonly userRepository: UserRepository,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async registerUser(userSignupInputsDto: UserSignupInputsDto): Promise<ServiceResponseDTO> {
    const {email, full_name, password} = userSignupInputsDto;
    const user = await this.userRepository.create({
      email,
      password,
      full_name
    });

    this.logger.log(`User account created successfully with : ${JSON.stringify(userSignupInputsDto)}`)
    return {
      successful: true,
      data:{
        id: user?._id,
        full_name: user?.full_name
      },
      message: "Your account was created successfully!"
    };
  }
}
