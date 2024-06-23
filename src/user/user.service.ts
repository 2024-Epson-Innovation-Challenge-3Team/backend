import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepo } from './repository/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  async currentUserInfo(id: UserEntity['id']) {
    return this.userRepo.findOneBy({ id });
  }

  async getUploadedFilesCnt(id: UserEntity['id']) {
    const { uploads } = await this.userRepo.findOneOrFail({
      relations: { uploads: true },
      where: { id },
    });

    return uploads.length;
  }
}
