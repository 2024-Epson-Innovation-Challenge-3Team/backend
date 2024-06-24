import { Inject, Injectable } from '@nestjs/common';
import {
  AreaQRTagRes,
  JOB_STATUS,
  PrinterStatusCallbackReq,
  PrinterZoneType,
} from './print.type';
import { JobRepo } from './repo/job.repo';
import { PrinterRepo } from './repo/printer.repo';
import { PrinterZoneRepo } from './repo/printerZone.repo';
import { UploadRepo } from '../upload/upload.repo';
import { PrintSymbol } from '../epson/epson.module';
import { Transactional } from 'typeorm-transactional';
import { PrinterService } from '../epson/printer.interface';
import { Not } from 'typeorm';
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
  async printerAssignment(printZoneId: number, userId: number) {
    const printer = await this.printerRepo.remainingPrinter(printZoneId);
    await this.jobRepo.printerAssignment(printZoneId, printer.id, userId);

    return printer.printerName;
  }

  async printerQRTag(
    printerQRTagReq: PrinterZoneType,
    userId: number,
  ): Promise<AreaQRTagRes> {
    const { printZoneId, printerId } = printerQRTagReq;

    const runningJob = await this.jobRepo.findOne({
      where: {
        printZone: { id: printZoneId },
        printer: { id: printerId },
        status: JOB_STATUS.PRINTER_ASSIGNMENT,
      },
    });

    if (runningJob) {
      const currentUserWaitingJob = await this.jobRepo.findOne({
        where: {
          printZone: { id: printZoneId },
          user: { id: userId },
          status: Not(JOB_STATUS.DONE),
        },
      });

      if (currentUserWaitingJob) {
        if (currentUserWaitingJob.status === JOB_STATUS.PRINTER_ASSIGNMENT) {
          return { status: 'PRINTER_ASSIGNMENT' };
        }
        const waitingNum = await this.getWaitingNum(printZoneId, userId);
        return { status: 'QUEUE', waitingNum: waitingNum };
      }

      await this.jobRepo.queueEntry(printZoneId, userId, printerId);
      const waitingNum = await this.getWaitingNum(printZoneId, userId);

      return { status: 'QUEUE', waitingNum: waitingNum };
    }

    const currentUserJob = await this.jobRepo.getQueueJob(
      printerQRTagReq,
      userId,
    );

    if (!currentUserJob) {
      const waitingJob = await this.jobRepo.find({
        where: {
          printer: { id: printerId },
          status: JOB_STATUS.WAITING,
        },
      });

      if (waitingJob.length) {
        await this.jobRepo.queueEntry(printZoneId, userId, printerId);
        const waitingNum = await this.getWaitingNum(printZoneId, userId);
        return { status: 'QUEUE', waitingNum };
      }
    }

    await this.jobRepo.printerAssignment(
      printZoneId,
      printerId,
      userId,
      currentUserJob?.id,
    );

    const { printerName } = await this.printerRepo.findOneByOrFail({
      id: printerId,
    });

    return { status: 'PRINT', printerName };
  }

  async getWaitingNum(printZoneId: number, userId: number) {
    const jobs = await this.jobRepo.getWaitingJobsByZone(printZoneId);

    if (!jobs.length) return 0;

    const { id } = await this.jobRepo.getWaitingJob(printZoneId, userId);

    return jobs.findIndex((d) => d.id === id);
  }

  async printExecute(printerQRTagReq: PrinterZoneType, userId: number) {
    const uploads = await this.uploadRepo.getUserUploads(userId);
    const queueJob = await this.jobRepo.getQueueJob(printerQRTagReq, userId);

    if (!queueJob) throw Error('gds');

    await this.jobRepo.applyUploadToJob(queueJob.id, uploads);

    const printJobs = uploads.map((d) =>
      this.printerService.printFile(
        printerQRTagReq.printerId,
        d.files[0].orgFileName,
        d.convertPrintSettingType(),
      ),
    );

    const printFileRes = await Promise.all(printJobs);
    await this.uploadRepo.printExecute(uploads, printFileRes);

    return true;
  }

  async printerStatusCallback(callbackReq: PrinterStatusCallbackReq) {
    const upload = await this.uploadRepo.findOneOrFail({
      relations: { job: { printer: true } },
      where: { printerJobId: callbackReq.JobId },
    });

    upload.status = callbackReq.JobStatus.Status;
    await upload.save();

    const jobId = upload.job!.id;

    const job = await this.jobRepo.findOne({
      relations: { uploads: true, printer: true },
      where: {
        id: jobId,
        uploads: {
          status: Not(UPLOAD_STATUS.DONE),
        },
      },
    });
    if (!job) {
      await this.jobRepo.update({ id: jobId }, { status: JOB_STATUS.DONE });
    }
  }
}
