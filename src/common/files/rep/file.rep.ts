import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from '../../../entities/file.entity';
import { PrintSettingType } from '../../../epson/epson.type';
import { UserLoginType } from '../../../auth/userLogin.type';

@Injectable()
export class FileRep extends Repository<FileEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }

  async saveMulterFiles(files: Array<Express.Multer.File>) {
    const fileEntities = files.map((d) =>
      this.create({
        fileName: d.filename,
        orgFileName: d.originalname,
        fileExtension: d.mimetype,
        fileSize: d.size,
      }),
    );
  }
}
