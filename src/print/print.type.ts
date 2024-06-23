import { UPLOAD_STATUS } from '../upload/upload.type';

export type QRTagReq = {
  printZoneId: number;
};

export type PrinterZoneType = {
  printerId: string;
} & QRTagReq;

export enum JOB_STATUS {
  'WAITING' = 'WAITING',
  'PRINTER_ASSIGNMENT' = 'PRINTER_ASSIGNMENT',
  'DONE' = 'DONE',
}

export enum PRINT_STATUS {
  'WAITING' = 'WAITING',
}

export type AreaQRTagRes = {
  status: 'QUEUE' | 'PRINT' | 'PRINTER_ASSIGNMENT';
  printerName?: string;
  waitingNum?: number;
};

export type PrinterStatusCallbackReq = {
  JobId: string;
  JobStatus: {
    Status: UPLOAD_STATUS;
    StatusReason: string;
    UpdateDate: string;
  };
};
