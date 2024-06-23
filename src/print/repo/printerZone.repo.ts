import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { JobEntity } from '../../entities/job.entity';
import { PrinterEntity } from '../../entities/printer.entity';
import { PrintZoneEntity } from '../../entities/printZone.entity';
import { JOB_STATUS } from '../print.type';

@Injectable()
export class PrinterZoneRepo extends Repository<PrintZoneEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PrintZoneEntity, dataSource.createEntityManager());
  }

  async findQueueAble(printZoneId: number) {
    return this.findOne({
      relations: { printers: { jobs: true } },
      where: { id: printZoneId },
    });
  }
}
