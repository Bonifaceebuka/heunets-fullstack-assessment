import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

type UserAttributes = keyof User;

export const CurrentUserCtx = createParamDecorator(
    (userAttribute: UserAttributes, context: ExecutionContext): any => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return userAttribute ? user && user[userAttribute] : user;
    }
);
