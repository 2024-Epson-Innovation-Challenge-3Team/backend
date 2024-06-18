import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepo extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
