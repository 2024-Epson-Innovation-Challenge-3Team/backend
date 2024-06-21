import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { JobEntity } from '../../entities/job.entity';
import { JOB_STATUS, PrinterZoneType } from '../print.type';
import { UploadEntity } from '../../entities/upload.entity';

@Injectable()
export class JobRepo extends Repository<JobEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JobEntity, dataSource.createEntityManager());
  }

  async queueEntry(printZoneId: number, userId: number) {
    return this.save({
      printZone: { id: printZoneId },
      status: JOB_STATUS.WAITING,
      user: { id: userId },
    });
  }

  async getQueueJob(
    { printZoneId, printerId }: PrinterZoneType,
    userId: number,
  ) {
    return this.findOneOrFail({
      where: {
        printZone: { id: printZoneId },
        user: { id: userId },
        printer: { id: printerId },
      },
    });
  }

  async printerAssignment(
    printZoneId: number,
    printerId: string,
    userId: number,
  ) {
    return this.save({
      printZone: { id: printZoneId },
      printer: { id: printerId },
      status: JOB_STATUS.PRINTER_ASSIGNMENT,
      user: { id: userId },
    });
  }

  async getWaitingJobsByZone(printZoneId: number) {
    return this.find({
      relations: { printZone: true },
      where: { printZone: { id: printZoneId }, status: JOB_STATUS.WAITING },
      order: { createDate: 'ASC' },
    });
  }

  async getWaitingJob(printZoneId: number, userId: number) {
    return this.findOneOrFail({
      relations: { printZone: true },
      where: {
        printZone: { id: printZoneId },
        status: JOB_STATUS.WAITING,
        user: { id: userId },
      },
    });
  }

  async changeStatusPrint(jobId: number, printerId: string) {
    return this.save({
      id: jobId,
      printer: { id: printerId },
      status: JOB_STATUS.PRINTER_ASSIGNMENT,
    });
  }

  async applyUploadToJob(jobId: number, uploads: UploadEntity[]) {
    await this.save({ id: jobId, uploads });
  }
}
