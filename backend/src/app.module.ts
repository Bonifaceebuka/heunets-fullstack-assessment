import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService as AppConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomConfigService } from './shared/config/config.service';
import { ProjectModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: () => {
        const logger = new Logger(`${AppModule.name}`);
         const envs = new CustomConfigService().getAppEnv();
        logger.debug(`Using node env: ${envs.NODE_ENV}, port: ${envs.PORT}`);
        return {
          uri: envs.MONGODB_URL,
        };
      },
    }),
    AuthModule,
    ProjectModule,
    ConfigModule,
    QueueModule,
  ],
})
export class AppModule {}
