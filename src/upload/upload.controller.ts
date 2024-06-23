import { Controller } from '@nestjs/common';
import { TypedFormData, TypedParam, TypedRoute } from '@nestia/core';
import { UploadService } from './upload.service';
import { UploadFileRes } from './res/uploadFile.res';
import { CurrentUser } from '../auth/jwt/getUser.decorator';
import { UserLoginType } from '../auth/userLogin.type';
import { GetUploadedFilesRes } from './res/getUploadedFiles.res';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @TypedRoute.Post('uploads')
  async uploadFile(
    @TypedFormData.Body() uploadFileRes: UploadFileRes,
    @CurrentUser() { id }: UserLoginType,
  ) {
    return this.uploadService.uploadFile(uploadFileRes, id);
  }

  @TypedRoute.Get('users/uploads/count')
  async getUploadedFilesCnt(
    @CurrentUser() { id }: UserLoginType,
  ): Promise<number> {
    return this.uploadService.getUploadedFilesCnt(id);
  }

  @TypedRoute.Get('users/uploads')
  async getUploadedFiles(
    @CurrentUser() { id }: UserLoginType,
  ): Promise<GetUploadedFilesRes[]> {
    return this.uploadService.getUploadedFiles(id);
  }

  @TypedRoute.Delete('users/uploads/:uploadId')
  async deleteUploadedFile(
    @CurrentUser() { id: userId }: UserLoginType,
    @TypedParam('uploadId') uploadId: number,
  ): Promise<boolean> {
    return this.uploadService.deleteUploadedFile(uploadId, userId);
  }
}
