import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { UserEntity } from './user.entity';
import { UploadEntity } from './upload.entity';
import { UploadFilesRes } from '../common/files/services/fileLocal.impl';

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

  @ManyToOne(() => UploadEntity, (d) => d.files, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  upload: UserEntity;

  static UploadFilesResToEntity(res: UploadFilesRes) {
    const fileEntity = new FileEntity();
    fileEntity.fileName = res.fileName;
    fileEntity.fileSize = res.size;
    fileEntity.fileExtension = res.ext;
    fileEntity.orgFileName = res.orgFileName;
    return fileEntity;
  }
}
