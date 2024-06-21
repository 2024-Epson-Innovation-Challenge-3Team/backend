import { Controller } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { PrintZoneService } from './printZone.service';
import { GetPrintZone } from './printZone.type';

@Controller()
export class PrintZoneController {
  constructor(private readonly printZoneService: PrintZoneService) {}

  @TypedRoute.Get('zone')
  async getPrintZone(): Promise<GetPrintZone[]> {
    return this.printZoneService.getPrintZone();
  }
}
