import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    initializeTransactionalContext();
    return await NestFactory.create(AppModule);
  },
  swagger: {
    output: 'swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
    beautify: true,
  },
  output: 'src/api',
  simulate: true,
  e2e: 'test',
};
export default NESTIA_CONFIG;
