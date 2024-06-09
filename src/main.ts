import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

(async function () {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  const swagger = await fs.readFile('swagger.json', { encoding: 'utf-8' });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swagger)));

  const port = +configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`app start port = ${port}`);
})();
