import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { UserEntity } from './user.entity';
import { FileEntity } from './file.entity';

@Entity({ name: 'uploads' })
export class UploadEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: ` 용지 크기 (ms_a4 - A4용지)` })
  media_size: 'ms_a4' | 'ms_a3';
  @Column({ comment: `용지 종류 (mt_plainpaper - )` })
  media_type: 'mt_plainpaper';
  @Column({ comment: `인쇄시 테투리 인쇄 설정 (false - 테투리있는 인쇄)` })
  borderless: boolean;
  @Column({ comment: `인쇄 품질 (normal - 보통)` })
  print_quality: 'normal';
  @Column({ comment: ` 급지 방법 (front2 - 전면 2번째 용지함)` })
  source: 'front1' | 'front2';
  @Column({ comment: `색상모드 (mono - 흑백)` })
  color_mode: 'mono' | 'color';
  @Column({ comment: ` 양면인쇄 (none - 단면인쇄)` })
  '2_sided': 'none';
  @Column({ comment: `역순인쇄 (false - 첫페이지부터 인쇄)` })
  reverse_order: boolean;
  @Column({ comment: ` 사본인쇄 (1 - 기본 설정, 1부만 인쇄)` })
  copies: number;
  @Column({
    comment: `묶음 인쇄 방법 (true - 세트로 인쇄, false - 페이지별 인쇄)`,
  })
  collate: boolean;

  @OneToOne(() => FileEntity, (d) => d.upload)
  @JoinColumn()
  file: FileEntity;

  @ManyToOne(() => UserEntity, (d) => d.upload)
  user: UserEntity;
}
