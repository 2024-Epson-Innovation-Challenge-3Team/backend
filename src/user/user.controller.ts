import { Controller } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { UserService } from './user.service';
import { Public } from '../auth/public.deco';
import { UserEntity } from '../entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get('sayHello')
  async sayHello(): Promise<UserEntity[]> {
    return this.userService.sayHello();
  }

  @TypedRoute.Get('insertIpnitValue')
  @Public()
  async insertInitValue(): Promise<UserEntity> {
    return this.userService.insertInitValue();
  }
}
