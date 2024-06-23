import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserLoginType } from "./userLogin.type";
import { ConfigService } from "@nestjs/config";
import { ConfigServiceType } from '../common/configServiceType';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  async login(userInfos: UserLoginType, res: Response) {
    const token = await this.jwtService.signAsync(userInfos);
    res.cookie('moti-tk', token, {
      secure: this.configService.get('NODE_ENV') !== 'dev',
      httpOnly: true,
    });
    return res.redirect(302, 'http://localhost:3000');
  }
}

