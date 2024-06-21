import { Inject, Injectable } from '@nestjs/common';
import { AreaQRTagRes, PrinterZoneType } from './print.type';
import { JobRepo } from './repo/job.repo';
import { PrinterRepo } from './repo/printer.repo';
import { PrinterZoneRepo } from './repo/printerZone.repo';
import { UploadRepo } from '../upload/upload.repo';
import { PrintSymbol } from '../epson/epson.module';
import { Transactional } from 'typeorm-transactional';
import { PrinterService } from '../epson/printer.interface';
import { MetadataTupleType } from 'typia/lib/schemas/metadata/MetadataTupleType';
import { UPLOAD_STATUS } from '../upload/upload.type';

@Injectable()
export class PrintService {
  constructor(
    private readonly jobRepo: JobRepo,
    private readonly printerRepo: PrinterRepo,
    private readonly printerZoneRepo: PrinterZoneRepo,
    private readonly uploadRepo: UploadRepo,
    @Inject(PrintSymbol)
    private readonly printerService: PrinterService,
  ) {}

  @Transactional()
  async areaQRTag(printZoneId: number, userId: number): Promise<AreaQRTagRes> {
    const standbyPrinter = await this.getStandbyPrinter(printZoneId);

    if (!standbyPrinter) {
      const printerName = await this.printerAssignment(printZoneId, userId);
      return { status: 'PRINT', printerName };
    }

    await this.jobRepo.queueEntry(printZoneId, userId);
    const waitingNum = await this.getWaitingNum(printZoneId, userId);

    return { status: 'QUEUE', waitingNum };
  }

  async getStandbyPrinter(printZoneId: number) {
    const printZone =
      await this.printerZoneRepo.findQueueAbleOrFail(printZoneId);

    return printZone.printers.find((d) => !d.jobs.length);
  }

  @Transactional()
  async printerAssignment(printZoneId: number, userId: number) {
    const printer = await this.printerRepo.remainingPrinter(printZoneId);
    await this.jobRepo.printerAssignment(printZoneId, printer.id, userId);

    return printer.printerName;
  }

  async printerAssignmentWithPrintId(
    printerQRTagReq: PrinterZoneType,
    userId: number,
  ) {
    const { id: jobId } = await this.jobRepo.getQueueJob(
      printerQRTagReq,
      userId,
    );

    await this.jobRepo.changeStatusPrint(jobId, printerQRTagReq.printerId);

    return true;
  }

  async getWaitingNum(printZoneId: number, userId: number) {
    const jobs = await this.jobRepo.getWaitingJobsByZone(printZoneId);

    const { id } = await this.jobRepo.getWaitingJob(printZoneId, userId);

    return jobs.findIndex((d) => d.id === id);
  }

  async printExecute(printerQRTagReq: PrinterZoneType, userId: number) {
    const uploads = await this.uploadRepo.getUserUploads(userId);
    const { id } = await this.jobRepo.getQueueJob(printerQRTagReq, userId);

    await this.jobRepo.applyUploadToJob(id, uploads);

    const printJobs = uploads.map((d) =>
      this.printerService.printFile(
        printerQRTagReq.printerId,
        d.files[0].fileName,
        d.convertPrintSettingType(),
      ),
    );

    const printFileRes = await Promise.all(printJobs);
    await this.uploadRepo.printExecute(uploads, printFileRes);

    return true;
  }
}