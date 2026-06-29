import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload';
import { PassportStrategy } from '@nestjs/passport';
import { CustomConfigService } from 'src/shared/config/config.service';
import { UserRepository } from '../repositories/user.respository';
import { dynamic_messages } from 'src/shared/constants/messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger: Logger;
    constructor(
        private authService: AuthService, 
        private userRepository: UserRepository, 
        private readonly configService: CustomConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getAppEnv().JWT_SECRET
        });
        this.logger = new Logger(AuthService.name);
    }
    async validate(payload: JwtPayload) {
        const user = await this.userRepository.findOne({
            email: payload.email
        });
        if (!user) {
            const message = dynamic_messages.NOT_FOUND("User not found");
            this.logger.error(message)
            throw new UnauthorizedException(`User not authorized`);
        }
        return user;
    }
}
