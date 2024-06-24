import { Injectable } from '@nestjs/common';
import { PrintSettingType } from './epson.type';

export type PrintFileResponse = {
  jobId: string;
  filePath: string;
};

export interface PrinterService {
  printFile(
    printerId: string,
    filePath: string,
    printSettingType: PrintSettingType,
  ): Promise<PrintFileResponse>;

  setAlarmOnThePrinter(
    access_token: string,
    printerId: string,
  ): Promise<boolean>;
}
