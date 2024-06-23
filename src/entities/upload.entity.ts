import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { UserEntity } from './user.entity';
import { FileEntity } from './file.entity';
import { JobEntity } from './job.entity';
import { UPLOAD_STATUS } from '../upload/upload.type';
import { PrintSettingType } from '../epson/epson.type';

@Entity({ name: 'uploads' })
export class UploadEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: ` 용지 크기 (ms_a4 - A4용지)`, nullable: true })
  media_size?: 'ms_a4' | 'ms_a3';
  @Column({ comment: `용지 종류 (mt_plainpaper - )`, nullable: true })
  media_type?: 'mt_plainpaper';
  @Column({
    comment: `인쇄시 테투리 인쇄 설정 (false - 테투리있는 인쇄)`,
    nullable: true,
  })
  borderless?: boolean;
  @Column({ comment: `인쇄 품질 (normal - 보통)`, nullable: true })
  print_quality?: 'normal';
  @Column({
    comment: ` 급지 방법 (front2 - 전면 2번째 용지함)`,
    nullable: true,
  })
  source?: 'front1' | 'front2';
  @Column({ comment: `색상모드 (mono - 흑백)`, nullable: true })
  color_mode?: 'mono' | 'color';
  @Column({ comment: ` 양면인쇄 (none - 단면인쇄)`, nullable: true })
  '2_sided'?: 'none';
  @Column({ comment: `역순인쇄 (false - 첫페이지부터 인쇄)`, nullable: true })
  reverse_order?: boolean;
  @Column({ comment: ` 사본인쇄 (1 - 기본 설정, 1부만 인쇄)`, nullable: true })
  copies?: number;
  @Column({
    comment: `묶음 인쇄 방법 (true - 세트로 인쇄, false - 페이지별 인쇄)`,
    nullable: true,
  })
  collate?: boolean;

  @Column({ default: UPLOAD_STATUS.WAITING })
  status: UPLOAD_STATUS;

  // @Column({ nullable: true })
  // printerJobId?: string;

  @Column({ type: 'int', nullable: true })
  page_cnt?: number;

  @OneToMany(() => FileEntity, (d) => d.upload, { cascade: ['insert'] })
  files: FileEntity[];

  @ManyToOne(() => UserEntity, (d) => d.uploads)
  user: UserEntity;

  @RelationId((d: UploadEntity) => d.user, 'userId')
  userId: UserEntity['id'];

  @ManyToOne(() => JobEntity, (d) => d.uploads, { nullable: true })
  job?: JobEntity;

  convertPrintSettingType(): PrintSettingType {
    return {
      media_size: this.media_size,
      media_type: this.media_type,
      borderless: this.borderless,
      print_quality: this.print_quality,
      source: this.source,
      color_mode: this.color_mode,
      '2_sided': this['2_sided'],
      reverse_order: this.reverse_order,
      copies: this.copies,
      collate: this.collate,
    };
  }
}
