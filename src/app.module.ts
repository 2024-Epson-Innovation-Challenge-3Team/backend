import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/JwtAuth.guard';
import { UserEntity } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { UploadModule } from './upload/upload.module';
import { CommonModule } from './common/common.module';
import { ConfigServiceType } from './common/configServiceType';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      timeout: 5_000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async dataSourceFactory(options) {
        if (!options) throw new Error('Invalid options passed');
        return addTransactionalDataSource(new DataSource(options));
      },
      useFactory: (configSvc: ConfigService<ConfigServiceType>) => {
        return {
          type: configSvc.get('DB_TYPE', 'sqlite'),
          database: configSvc.get('DB_DATABASE', ':memory:') as any,
          logging: true,
          synchronize: true,
          entities: ['dist/**/entities/*.js', UserEntity],
        };
      },
    }),
    UserModule,
    AuthModule,
    UploadModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
