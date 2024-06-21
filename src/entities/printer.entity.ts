import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { JobEntity } from './job.entity';
import { PrintZoneEntity } from './printZone.entity';

@Entity({ name: 'printers' })
export class PrinterEntity extends BaseDateEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ comment: '프린터 이름' })
  printerName: string;

  @Column({ comment: '프린터 알람 설정 여부', default: false })
  printerAlarmFlag: boolean;

  @ManyToOne(() => PrintZoneEntity, (d) => d.printers)
  printZone: PrintZoneEntity;

  @OneToMany(() => JobEntity, (d) => d.printer)
  jobs: JobEntity[];
}
