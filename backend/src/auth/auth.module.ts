import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.respository';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CustomConfigService } from 'src/shared/config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CustomConfigModule } from 'src/shared/config/config.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserRepository,
    JwtStrategy, 
    CustomConfigService
  ],
  exports: [AuthService],
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
        useFactory: async (configService: CustomConfigService) => ({
            signOptions: { expiresIn: '1h' },
            secret: configService.getAppEnv().JWT_SECRET
        }),
        inject: [CustomConfigService]
    })
  ],
})
export class AuthModule {}
