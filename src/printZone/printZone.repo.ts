import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PrinterZoneRepo } from '../print/repo/printerZone.repo';
import { PrintZoneEntity } from '../entities/printZone.entity';

@Injectable()
export class PrintZoneRepo extends Repository<PrintZoneEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PrintZoneEntity, dataSource.createEntityManager());
  }

  async getPrintZones() {
    return this.find({
      relations: {
        printers: true,
        jobs: { uploads: true },
      },
    });
  }
}
