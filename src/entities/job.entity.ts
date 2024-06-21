import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { PrinterEntity } from './printer.entity';
import { UploadEntity } from './upload.entity';
import { PrintZoneEntity } from './printZone.entity';
import { JOB_STATUS } from '../print/print.type';
import { UserEntity } from './user.entity';

@Entity({ name: 'jobs' })
export class JobEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '상태' })
  status: JOB_STATUS;

  @ManyToOne(() => PrintZoneEntity, (d) => d.jobs)
  printZone: PrintZoneEntity;

  @ManyToOne(() => PrinterEntity, (d) => d.jobs, { nullable: true })
  printer?: PrinterEntity;

  @OneToMany(() => UploadEntity, (d) => d.job)
  uploads: UploadEntity[];

  @ManyToOne(() => UserEntity, (d) => d.jobs)
  user: UserEntity;
}
