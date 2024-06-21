export type GetPrintZone = {
  zone_name: string;
  la: string;
  lo: string;
  address: string;
  printers: { printName: string }[];
  congestion: number;
};
