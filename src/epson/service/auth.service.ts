import { Injectable } from '@nestjs/common';
import * as querystring from 'querystring';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import { HttpService } from '@nestjs/axios';
import { AuthResType } from '../epson.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<ConfigServiceType>,
    private readonly httpService: HttpService,
  ) {}
  private readonly host = this.configService.get('EPSON_HOST');
  private readonly clientId = this.configService.get('EPSON_CLIENT_ID');
  private readonly secret = this.configService.get('EPSON_SECRET');
  private readonly device = this.configService.get('EPSON_DEVICE');

  async authenticate(): Promise<AuthResType> {
    const authUri = `https://${this.host}/api/1/printing/oauth2/auth/token?subject=printer`;
    const auth = Buffer.from(`${this.clientId}:${this.secret}`).toString(
      'base64',
    );
    const bodyParams = {
      grant_type: 'password',
      username: this.device,
      password: '',
    };

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const { data } = await this.httpService.axiosRef
      .post<AuthResType>(authUri, querystring.stringify(bodyParams), {
        headers,
      })
      .catch((error) => {
        console.error('Authentication error:', error.response.data);
        throw error;
      });

    return data;
  }
}
