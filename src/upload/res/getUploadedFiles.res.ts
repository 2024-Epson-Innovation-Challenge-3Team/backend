export interface GetUploadedFilesRes {
  uploadId: number;
  fileName: string;
  pageCnt?: number | null;
  status?: string;
}
