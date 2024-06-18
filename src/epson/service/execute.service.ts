import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';

@Injectable()
export class ExecuteService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  private readonly host = this.configService.get('EPSON_HOST');

  async executePrint(
    subjectId: string,
    jobId: string,
    accessToken: string,
  ): Promise<any> {
    const printUri = `https://${this.host}/api/1/printing/printers/${subjectId}/jobs/${jobId}/print`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    };

    try {
      const response = await this.httpService.axiosRef.post(
        printUri,
        {},
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Execute print error:', error.response.data);
      throw error;
    }
  }
}
