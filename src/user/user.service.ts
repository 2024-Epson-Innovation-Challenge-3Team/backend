import { Injectable } from '@nestjs/common';
import { UserRepo } from './repository/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  async sayHello() {
    return this.userRepo.find();
  }

  insertInitValue() {
    return this.userRepo.save({
      name: '차규범 ㅋㅋ',
    });
  }
}
