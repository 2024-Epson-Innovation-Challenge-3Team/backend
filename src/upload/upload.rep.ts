import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UploadEntity } from '../entities/upload.entity';

@Injectable()
export class UploadRep extends Repository<UploadEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UploadEntity, dataSource.createEntityManager());
  }
}
