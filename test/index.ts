import core from '@nestia/core';
import { DynamicExecutor } from '@nestia/e2e';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from '../src/app.module';

async function main(): Promise<void> {
  initializeTransactionalContext();
  const server: INestApplication = await NestFactory.create(AppModule);
  await server.listen(37_000);

  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    extension: __filename.substring(__filename.length - 2),
    prefix: 'test',
    parameters: () => [
      {
        host: 'http://127.0.0.1:37000',
      },
    ],
  })(`${__dirname}/features`);
  await server.close();

  const exceptions: Error[] = report.executions
    .filter((exec) => exec.error !== null)
    .map((exec) => exec.error!);
  if (exceptions.length === 0) {
    console.log('Success');
    console.log('Elapsed time', report.time.toLocaleString(), `ms`);
  } else {
    for (const exp of exceptions) console.log(exp);
    console.log('Failed');
    console.log('Elapsed time', report.time.toLocaleString(), `ms`);
    process.exit(-1);
  }
}

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
