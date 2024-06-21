import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UploadEntity } from '../entities/upload.entity';
import { UPLOAD_STATUS } from './upload.type';
import { PrintFileResponse } from '../epson/printer.interface';

@Injectable()
export class UploadRepo extends Repository<UploadEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UploadEntity, dataSource.createEntityManager());
  }

  async getUserUploads(userId: number) {
    return this.find({
      relations: { files: true },
      where: { user: { id: userId } },
    });
  }

  async printExecute(
    uploads: UploadEntity[],
    printFileRes: PrintFileResponse[],
  ) {
    const uploadEntity = uploads.map((upload) => ({
      ...upload,
      status: UPLOAD_STATUS.WAITING,
      printerJobId: printFileRes.find(
        (d) => d.filePath === upload.files[0].fileName,
      )!.jobId,
    }));

    await this.save(uploadEntity);
  }
}
