import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      async dataSourceFactory(options) {
        if (!options) throw new Error('Invalid options passed');
        return addTransactionalDataSource(new DataSource(options));
      },
      useFactory: () => {
        return {
          type: 'sqlite',
          database: ':memory:',
          logging: true,
          synchronize: true,
          entities: ['dist/**/entities/*.js'],
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
