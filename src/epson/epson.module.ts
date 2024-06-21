import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { ExecuteService } from './service/execute.service';
import { PrintService } from './service/print.service';
import { UploadService } from './service/upload.service';
import { EpsonPrintImpl } from './epsonPrint.impl';
import { AlarmService } from './service/alarm.service';
import { HttpModule } from '@nestjs/axios';

export const PrintSymbol = Symbol('PrintSymbol');

@Module({
  imports: [HttpModule],
  providers: [
    AuthService,
    ExecuteService,
    PrintService,
    UploadService,
    AlarmService,
    {
      provide: PrintSymbol,
      useClass: EpsonPrintImpl,
    },
  ],
  exports: [PrintSymbol],
})
export class EpsonModule {}
