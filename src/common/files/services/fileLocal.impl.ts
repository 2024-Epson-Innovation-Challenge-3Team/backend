import { Module } from '@nestjs/common';
import { FileSvcInf } from './file.interface';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Module({})
export class FileLocalImpl implements FileSvcInf {
  constructor() {}

  async uploadFiles(files: File[]): Promise<void> {
    const fileJobs = files.map(async (file) => {
      const data = await file.arrayBuffer();
      return fs.writeFile(path.basename(file.name), Buffer.from(data));
    });

    await Promise.all(fileJobs);
  }
  async getFiles(fileName: string[]): Promise<Buffer[]> {
    const files = fileName.map((d) => {
      return fs.readFile(path.basename(d));
    });

    return Promise.all(files);
  }
}
