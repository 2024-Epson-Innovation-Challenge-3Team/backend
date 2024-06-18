import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import * as fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigServiceType } from './common/configServiceType';

(async function () {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  const configService = app.get(ConfigService<ConfigServiceType>);

  const swagger = await fs.readFile('swagger.json', { encoding: 'utf-8' });
  SwaggerModule.setup('api', app, JSON.parse(swagger));

  const port = +configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`app start port = ${port}`);
})();
