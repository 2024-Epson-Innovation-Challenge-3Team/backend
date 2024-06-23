import { Injectable } from '@nestjs/common';
import { PrintZoneRepo } from './printZone.repo';
import { GetPrintZone } from './printZone.type';

@Injectable()
export class PrintZoneService {
  constructor(private readonly getPrintZones: PrintZoneRepo) {}

  async getPrintZone(): Promise<GetPrintZone[]> {
    const printZones = await this.getPrintZones.getPrintZones();

    return printZones.map((d) => ({
      zone_name: d.zone_name,
      la: d.la,
      lo: d.lo,
      address: d.address,
      printers: d.printers.map((d) => ({ printName: d.printerName })),
      congestion:
        d.jobs
          .flatMap((d) => d.uploads.flatMap((d) => d.page_cnt))
          .reduce((a = 0, b = 0) => a + b, 0) ?? 0,
    }));
  }
}
