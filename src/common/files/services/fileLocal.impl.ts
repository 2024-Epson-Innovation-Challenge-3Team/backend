import { Module } from '@nestjs/common';
import { FileSvcInf } from './file.interface';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { v4 as uuid } from 'uuid';

export type GetFilesInfoReq = { ext: string; fileName: string; size: number };
export type UploadFilesRes = GetFilesInfoReq & { orgFileName: string };

@Module({})
export class FileLocalImpl implements FileSvcInf {
  constructor() {}

  async deleteFile(fileName: string): Promise<void> {
    await fs.unlink(path.join('asset', fileName));
  }

  async uploadFiles(files: File[]): Promise<UploadFilesRes[]> {
    const res: UploadFilesRes[] = [];

    const fileJobs = files.map(async (file) => {
      const fileInfo = this.getFileInfo(file);

      const orgFileName = `${uuid()}.${fileInfo.ext}`;
      res.push({ ...fileInfo, orgFileName });

      const data = await file.arrayBuffer();
      return fs.writeFile(path.join('asset', orgFileName), Buffer.from(data));
    });

    await Promise.all(fileJobs);

    return res;
  }

  async getFiles(fileName: string[]): Promise<Buffer[]> {
    const files = fileName.map((d) => {
      return fs.readFile(path.basename(d));
    });

    return Promise.all(files);
  }

  getFileInfo({ name, size }: File): GetFilesInfoReq {
    const [ext, ...fileName] = name.split('.').reverse();

    return { ext, size, fileName: `${fileName.join()}.${ext}` };
  }
}
