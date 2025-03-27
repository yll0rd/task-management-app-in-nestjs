/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as UserEntity;
  },
);
