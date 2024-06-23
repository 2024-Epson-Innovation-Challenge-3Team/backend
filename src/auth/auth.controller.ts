import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { NaverGuard } from './naver/naver.guard';
import { Public } from './public.deco';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserLoginType } from './userLogin.type';
import { ApiTags } from '@nestjs/swagger';

@Public()
@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(NaverGuard)
  @TypedRoute.Get('/naver/login')
  async naverLogin() {}

  @UseGuards(NaverGuard)
  @TypedRoute.Get('/naver/login/callback')
  async naverLoginCallback(
    @Req() { user }: { user: UserLoginType },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    return user;
  }
}
