import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { JobEntity } from '../../entities/job.entity';
import { PrinterEntity } from '../../entities/printer.entity';
import { JOB_STATUS } from '../print.type';

@Injectable()
export class PrinterRepo extends Repository<PrinterEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PrinterEntity, dataSource.createEntityManager());
  }

  async remainingPrinter(printZoneId: number) {
    return this.findOneOrFail({
      relations: { printZone: true, jobs: true },
      where: {
        printZone: { id: printZoneId },
        jobs: { id: Not(IsNull()) },
      },
    });
  }
}
