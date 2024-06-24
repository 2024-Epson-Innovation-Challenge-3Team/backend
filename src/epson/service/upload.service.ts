import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../../common/configServiceType';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class UploadService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  private readonly host = this.configService.get('EPSON_HOST');

  async uploadPrintFile(baseUri: string, localFilePath: string): Promise<void> {

    const ext = localFilePath.split('.').reverse()[0];
    const uploadUri = `${baseUri}&File=1.${ext}`;

    const headers = {
      'Content-Type': ext === 'png' ? 'image/png' : 'image/jpeg',
    };

    try {
      const fileStream = fs.createReadStream(path.join('asset', localFilePath));
      const response = await this.httpService.axiosRef.post(
        uploadUri,
        fileStream,
        { headers },
      );
      console.log('File upload successful:', response.data);
    } catch (error) {
      console.error('Upload print file error:', error.response.data);
      throw error;
    }
  }
}
