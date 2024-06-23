import { Inject, Injectable } from '@nestjs/common';
import { FileSvcInf } from '../common/files/services/file.interface';
import { FILE_TOKEN } from '../common/common.provide';
import { UploadRepo } from './upload.repo';
import { UploadFileRes } from './res/uploadFile.res';
import { FileEntity } from '../entities/file.entity';
import { Transactional } from 'typeorm-transactional';
import { UserEntity } from '../entities/user.entity';
import { GetUploadedFilesRes } from './res/getUploadedFiles.res';

@Injectable()
export class UploadService {
  constructor(
    @Inject(FILE_TOKEN) private readonly fileSvc: FileSvcInf,
    private readonly uploadRep: UploadRepo,
  ) {}

  @Transactional()
  async uploadFile(uploadFileRes: UploadFileRes, userId: UserEntity['id']) {
    const { files, ...uploadSetting } = uploadFileRes;
    const uploadFilesRes = await this.fileSvc.uploadFiles(files);

    await this.uploadRep.save({
      ...uploadSetting,
      files: uploadFilesRes.map(FileEntity.UploadFilesResToEntity),
      user: { id: userId },
    });
  }

  async getUploadedFilesCnt(userId: UserEntity['id']) {
    return (await this.uploadRep.findBy({ userId })).length;
  }

  async getUploadedFiles(
    userId: UserEntity['id'],
  ): Promise<GetUploadedFilesRes[]> {
    const uploadEntities = await this.uploadRep.find({
      relations: { files: true },
      where: { user: { id: userId } },
    });

    return uploadEntities.map((d) => ({
      uploadId: d.id,
      fileName: d.files[0].fileName,
      pageCnt: d.page_cnt,
      status: d.status,
      createDate: d.createDate,
    }));
  }

  @Transactional()
  async deleteUploadedFile(id: number, userId: number) {
    const uploadEntity = await this.uploadRep.findOneOrFail({
      relations: { files: true },
      where: { id, user: { id: userId } },
    });

    await uploadEntity.remove();

    await Promise.all([
      uploadEntity.files.map((d) => this.fileSvc.deleteFile(d.orgFileName)),
    ]);

    return true;
  }
}
