import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import {
  AlarmServiceType,
  PrintJobDataType,
  PrintResType,
} from '../epson.type';

@Injectable()
export class AlarmService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  private readonly host = this.configService.get('EPSON_HOST');

  async setAlarmOnThePrinter(
    printerId: string,
    accessToken: string,
  ): Promise<AlarmServiceType> {
    const jobUri = `https://${this.host}/api/1/printing/printers/${printerId}/settings/notification`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };
    const data = {
      notification: true,
      callback_uri:
        'https://90d6-211-217-196-113.ngrok-free.app/status/callback',
    };

    try {
      const response = await this.httpService.axiosRef.post<AlarmServiceType>(
        jobUri,
        data,
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Create print job error:', error.response.data);
      throw error;
    }
  }
}
