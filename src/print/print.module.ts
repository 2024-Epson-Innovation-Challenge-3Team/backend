import { Module } from '@nestjs/common';
import { PrintService } from './print.service';
import { PrintController } from './print.controller';
import { JobRepo } from './repo/job.repo';
import { PrinterRepo } from './repo/printer.repo';
import { PrinterZoneRepo } from './repo/printerZone.repo';
import { UploadModule } from '../upload/upload.module';
import { EpsonModule } from '../epson/epson.module';

@Module({
  providers: [PrintService, JobRepo, PrinterRepo, PrinterZoneRepo],
  controllers: [PrintController],
  imports: [UploadModule, EpsonModule],
})
export class PrintModule {}
