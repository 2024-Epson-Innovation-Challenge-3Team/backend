import { Injectable } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { JobEntity } from '../../entities/job.entity';
import { JOB_STATUS, PrinterZoneType } from '../print.type';
import { UploadEntity } from '../../entities/upload.entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class JobRepo extends Repository<JobEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(JobEntity, dataSource.createEntityManager());
  }

  async queueEntry(printZoneId: number, userId: number, printerId: string) {
    return this.save({
      printer: { id: printerId },
      printZone: { id: printZoneId },
      status: JOB_STATUS.WAITING,
      user: { id: userId },
    });
  }

  async getQueueJob(
    { printZoneId, printerId }: PrinterZoneType,
    userId: number,
  ) {
    return this.findOne({
      where: {
        printZone: { id: printZoneId },
        user: { id: userId },
        printer: { id: printerId },
        status: Not(JOB_STATUS.DONE),
      },
    });
  }

  async printerAssignment(
    printZoneId: number,
    printerId: string,
    userId: number,
    jobId?: number,
  ) {
    const entity: DeepPartial<JobEntity> = {
      printZone: { id: printZoneId },
      printer: { id: printerId },
      status: JOB_STATUS.PRINTER_ASSIGNMENT,
      user: { id: userId },
    };

    jobId && (entity.id = jobId);

    return this.save(entity);
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
