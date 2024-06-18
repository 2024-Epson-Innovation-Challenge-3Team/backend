export interface FileSvcInf {
  //파일 업로드
  uploadFiles(files: File[]): Promise<void>;
  //파일 가져오기
  getFiles(fileName: string[]): Promise<Buffer[]>;
}
