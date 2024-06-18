import { Controller, UseInterceptors } from '@nestjs/common';
import { TypedFormData, TypedRoute } from '@nestia/core';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceType } from '../common/configServiceType';
import { UploadFileRes } from './res/uploadFile.res';
import { Public } from "../auth/public.deco";

@Controller()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService<ConfigServiceType>,
  ) {}
  @TypedRoute.Post('upload')
  // @UseInterceptors(FilesInterceptor('file'))
  @Public()
  async uploadFile(@TypedFormData.Body() uploadFileRes: UploadFileRes) {
    return this.uploadService.uploadFile(uploadFileRes);
  }
}
