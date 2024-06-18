import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadRep } from './upload.rep';

@Module({
  providers: [UploadService, UploadRep],
  controllers: [UploadController],
})
export class UploadModule {}
