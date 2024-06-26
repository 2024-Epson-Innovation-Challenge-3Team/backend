import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserLoginType } from '../userLogin.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // const request = ctx.switchToHttp().getRequest();
    // return request.user as UserLoginType;
    return { id:1, username:"user1" } as UserLoginType
  },
);
