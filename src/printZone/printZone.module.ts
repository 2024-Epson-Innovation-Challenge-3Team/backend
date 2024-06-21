import { Module } from '@nestjs/common';
import { PrintZoneService } from './printZone.service';
import { PrintZoneRepo } from './printZone.repo';
import { PrintZoneController } from './printZone.controller';

@Module({
  controllers: [PrintZoneController],
  providers: [PrintZoneService, PrintZoneRepo],
})
export class PrintZoneModule {}
