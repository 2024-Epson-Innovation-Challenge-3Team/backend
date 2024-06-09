import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

export class NaverGuard extends AuthGuard('naver') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }
}
