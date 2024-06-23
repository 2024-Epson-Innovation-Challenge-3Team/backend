import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import { UserLoginType } from '../userLogin.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {
    super({
      // ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.['cookies']?.['moti-tk'];
        },
      ]),
    });
  }

  async validate(payload: any): Promise<UserLoginType> {
    console.log(payload);
    return { id: payload.sub, username: payload.username };
  }
}
