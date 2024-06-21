import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import { AlarmServiceType, PrintResType } from '../epson.type';

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

    try {
      const response = await this.httpService.axiosRef.post<AlarmServiceType>(
        jobUri,
        {},
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Create print job error:', error.response.data);
      throw error;
    }
  }
}
