import { Logger } from "@nestjs/common";
import { AppError } from "src/shared/handlers/errors/AppError";

export enum EnvironmentKeys {
    NODE_ENV = 'NODE_ENV',
    JWT_SECRET = 'JWT_SECRET',
    JWT_EMAIL_SECRET = 'JWT_EMAIL_SECRET',
    PORT = 'PORT',
    MONGODB_URL = 'MONGODB_URL',
}

export class CustomConfigService {
    private getEnv(key: EnvironmentKeys): string {
        const envKey = EnvironmentKeys[key];
        const logger = new Logger(`${CustomConfigService.name}`);
        if (!envKey) {
            logger.error(`Missing environment variable: ${key}`);
            throw new AppError (`Missing environment variable: ${key}`, 500);
        }
        return process.env[envKey] as string;
    }

    getAppEnv() {
        return {
            NODE_ENV: this.getEnv(EnvironmentKeys.NODE_ENV),
            MONGODB_URL: this.getEnv(EnvironmentKeys.MONGODB_URL),
            PORT: this.getEnv(EnvironmentKeys.PORT),
        }
    }
}
