import { Global, Module } from '@nestjs/common';
import { FileLocalImpl } from './files/services/fileLocal.impl';
import { FILE_TOKEN } from './common.provide';

@Module({
  providers: [
    {
      provide: FILE_TOKEN,
      useClass: FileLocalImpl,
    },
  ],
  exports: [FILE_TOKEN],
})
@Global()
export class CommonModule {}
