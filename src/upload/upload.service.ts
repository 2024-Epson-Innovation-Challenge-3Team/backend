import { Inject, Injectable } from '@nestjs/common';
import { FileSvcInf } from '../common/files/services/file.interface';
import { FILE_TOKEN } from '../common/common.provide';
import { UploadRep } from './upload.rep';
import { UploadFileRes } from './res/uploadFile.res';

@Injectable()
export class UploadService {
  constructor(
    @Inject(FILE_TOKEN) private readonly fileSvc: FileSvcInf,
    private readonly uploadRep: UploadRep,
  ) {}
  async uploadFile(uploadFileRes: UploadFileRes) {
    await this.fileSvc.uploadFiles(uploadFileRes.files);

    const { name, size, type} = uploadFileRes.files[0];
    console.log(name, size, type);

    // uploadFileRes.files[0].name;
    // const fileEntities = files.map(FileEntity.multerToEntity);

    return Promise.resolve(undefined);
  }
}
