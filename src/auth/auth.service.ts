import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserLoginType } from './userLogin.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(userInfos: UserLoginType, res: Response) {
    const token = await this.jwtService.signAsync(userInfos);
    res.cookie('moti-tk', token, {
      secure: true,
      httpOnly: this.configService.get('NODE_ENV') !== 'dev',
    });
  }
}
