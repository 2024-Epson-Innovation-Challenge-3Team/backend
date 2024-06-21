import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDateEntity } from './baseDate.entity';
import { UploadEntity } from './upload.entity';
import { PrinterEntity } from './printer.entity';
import { JobEntity } from './job.entity';

@Entity({ name: 'print_zones' })
export class PrintZoneEntity extends BaseDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '구역 이름' })
  zone_name: string;

  @Column({ comment: '경도' })
  lo: string;
  @Column({ comment: '위도' })
  la: string;

  @Column({ comment: '주소' })
  address: string;

  @OneToMany(() => PrinterEntity, (d) => d.printZone)
  printers: PrinterEntity[];

  @OneToMany(() => JobEntity, (d) => d.printZone)
  jobs: JobEntity[];
}
