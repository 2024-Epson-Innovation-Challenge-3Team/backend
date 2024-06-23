import { Controller, Query } from "@nestjs/common";
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { PrintService } from './print.service';
import { AreaQRTagRes, PrinterStatusCallbackReq, PrinterZoneType, QRTagReq } from "./print.type";
import { UserLoginType } from '../auth/userLogin.type';
import { CurrentUser } from '../auth/jwt/getUser.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('print')
export class PrintController {
  constructor(private readonly printService: PrintService) {}

  @TypedRoute.Post('area/QR')
  @ApiTags('QR')
  async areaQRTag(
    @TypedBody() { printZoneId }: QRTagReq,
    @CurrentUser() { id }: UserLoginType,
  ): Promise<AreaQRTagRes> {
    return this.printService.areaQRTag(printZoneId, id);
  }

  @TypedRoute.Post('print/QR')
  @ApiTags('QR')
  async printerQRTag(
    @TypedBody() printerQRTagReq: PrinterZoneType,
    @CurrentUser() { id: userId }: UserLoginType,
  ): Promise<AreaQRTagRes> {
    return this.printService.printerAssignmentWithPrintId(
      printerQRTagReq,
      userId,
    );
  }

  @TypedRoute.Get('queue/seq')
  async queueNum(
    @TypedQuery() { printZoneId }: QRTagReq,
    @CurrentUser() { id }: UserLoginType,
  ): Promise<number> {
    return this.printService.getWaitingNum(printZoneId, id);
  }

  @TypedRoute.Post('print/execute')
  async printExecute(
    @TypedBody() printerQRTagReq: PrinterZoneType,
    @CurrentUser() { id: userId }: UserLoginType,
  ): Promise<boolean> {
    return this.printService.printExecute(printerQRTagReq, userId);
  }

  @TypedRoute.Get("status/callback")
  async printerStatusCallback(
    @Query() callbackReq:PrinterStatusCallbackReq

  ) {
    return this.printService.printerStatusCallback(callbackReq);
  }
}
