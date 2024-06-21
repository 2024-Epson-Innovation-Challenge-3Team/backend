import { GetFilesInfoReq, UploadFilesRes } from './fileLocal.impl';

export interface FileSvcInf {
  //파일 업로드
  uploadFiles(files: File[]): Promise<UploadFilesRes[]>;
  //파일 가져오기
  getFiles(fileName: string[]): Promise<Buffer[]>;
  //파일 삭제
  deleteFile(fileName: string): Promise<void>;

  getFileInfo(files: File): GetFilesInfoReq;
}
