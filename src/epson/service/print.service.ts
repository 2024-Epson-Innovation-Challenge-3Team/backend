import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import {
  PrintJobDataType,
  PrintResType,
  PrintSettingType,
} from '../epson.type';

@Injectable()
export class PrintService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  private readonly host = this.configService.get('EPSON_HOST');

  async createPrintJob(
    subjectId: string,
    accessToken: string,
    printSetting: PrintSettingType,
    ext: string,
  ): Promise<PrintResType> {
    const jobUri = `https://${this.host}/api/1/printing/printers/${subjectId}/jobs`;
    const data: PrintJobDataType = {
      job_name: 'SampleJob1',
      print_mode: ext === 'png' ? 'photo' : 'document',
      // print_setting: printSetting,
    };

    console.log(printSetting);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };

    try {
      const response = await this.httpService.axiosRef.post<PrintResType>(
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
