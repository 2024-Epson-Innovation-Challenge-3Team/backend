export type ConfigServiceType = {
  NODE_ENV: 'dev' | 'qa' | 'prod';
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  PORT: number;
} & naverConfigType &
  epsonConfigType &
  dbConfigType;

export type naverConfigType = {
  NAVER_CLIENT_ID: string;
  NAVER_CLIENT_SECRET: string;
  NAVER_CALLBACK_URL: string;
};

export type epsonConfigType = {
  EPSON_HOST: string;
  EPSON_CLIENT_ID: string;
  EPSON_SECRET: string;
  EPSON_DEVICE: string;
};

export type dbConfigType = {
  DB_TYPE: string;
  DB_DATABASE: string;
};
