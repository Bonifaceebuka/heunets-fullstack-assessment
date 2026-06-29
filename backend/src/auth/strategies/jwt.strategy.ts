import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from './jwt-payload';
import { PassportStrategy } from '@nestjs/passport';
import { CustomConfigService } from 'src/shared/config/config.service';
import { UserRepository } from '../repositories/user.respository';
import { dynamic_messages } from 'src/shared/constants/messages';
import { AppError } from 'src/shared/handlers/errors/AppError';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger: Logger;
    constructor(
        private userRepository: UserRepository, 
        private readonly configService: CustomConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getAppEnv().JWT_SECRET
        });
        this.logger = new Logger(JwtStrategy.name);
    }
    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findOne({
            email: payload.email
        });
        if (!user) {
            const message = dynamic_messages.NOT_FOUND("User not found");
            this.logger.error(message)
            throw new AppError(`User not authorized`);
        }
        return user;
    }
}
