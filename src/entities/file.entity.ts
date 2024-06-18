import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { UserEntity } from './user.entity';
import { UploadEntity } from './upload.entity';

@Entity({ name: 'files' })
export class FileEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '원본 파일 명' })
  orgFileName: string;

  @Column({ comment: '파일명' })
  fileName: string;

  @Column({ comment: '파일 크기' })
  fileSize: number;

  @Column({ comment: '파일 확장자' })
  fileExtension: string;

  @ManyToOne(() => UserEntity, (d) => d.uploadFiles)
  uploader: UserEntity;

  @OneToOne(() => UploadEntity, (d) => d.file)
  upload: UserEntity;

  static multerToEntity(file: Express.Multer.File) {
    const fileEntity = new FileEntity();

    fileEntity.fileName = file.filename;
    fileEntity.orgFileName = file.originalname;
    fileEntity.fileExtension = file.mimetype;
    fileEntity.fileSize = file.size;
    return fileEntity;
  }
}
