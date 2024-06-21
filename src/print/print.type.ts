export type QRTagReq = {
  printZoneId: number;
};

export type PrinterZoneType = {
  printerId: string;
} & QRTagReq;

export enum JOB_STATUS {
  'WAITING' = 'WAITING',
  'PRINTER_ASSIGNMENT' = 'PRINTER_ASSIGNMENT',
}

export enum PRINT_STATUS {
  'WAITING' = 'WAITING',
}

export type AreaQRTagRes = {
  status: 'QUEUE' | 'PRINT';
  printerName?: string;
  waitingNum?: number;
};
