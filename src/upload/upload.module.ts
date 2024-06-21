import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadRepo } from './upload.repo';

@Module({
  providers: [UploadService, UploadRepo],
  controllers: [UploadController],
  exports: [UploadRepo, UploadService],
})
export class UploadModule {}
