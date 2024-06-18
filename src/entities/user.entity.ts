import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { FileEntity } from './file.entity';
import { UploadEntity } from './upload.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '사용자 이름' })
  name: string;

  @OneToMany(() => FileEntity, (d) => d.uploader)
  uploadFiles: FileEntity[];

  @OneToMany(() => UploadEntity, (d) => d.user)
  upload: UploadEntity[];
}
