import { Injectable } from '@nestjs/common';
import { PrinterService, PrintFileResponse } from './printer.interface';
import { AuthService } from './service/auth.service';
import { ExecuteService } from './service/execute.service';
import { PrintService } from './service/print.service';
import { UploadService } from './service/upload.service';
import { PrintSettingType } from './epson.type';
import { AlarmService } from './service/alarm.service';

@Injectable()
export class EpsonPrintImpl implements PrinterService {
  constructor(
    private readonly authService: AuthService,
    private readonly executeService: ExecuteService,
    private readonly printService: PrintService,
    private readonly uploadService: UploadService,
    private readonly alarmService: AlarmService,
  ) {}

  async setAlarmOnThePrinter(printerId: string): Promise<boolean> {
    const { access_token } = await this.authService.authenticate(printerId);

    const alarmServiceType = await this.alarmService.setAlarmOnThePrinter(
      printerId,
      access_token,
    );

    return alarmServiceType.notification;
  }

  async printFile(
    printerId: string,
    filePath: string,
    printSettingType: PrintSettingType,
  ): Promise<PrintFileResponse> {
    const { subject_id, access_token } =
      await this.authService.authenticate(printerId);
    const { upload_uri, id } = await this.printService.createPrintJob(
      subject_id,
      access_token,
      printSettingType,
    );

    await this.uploadService.uploadPrintFile(upload_uri, filePath);
    await this.executeService.executePrint(subject_id, id, access_token);

    return { jobId: id, filePath };
  }
}
