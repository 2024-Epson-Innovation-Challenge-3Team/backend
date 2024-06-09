import { Controller } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { UserService } from './user.service';
import { Public } from '../auth/public.deco';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get('sayHello')
  @Public()
  async sayHello() {
    return this.userService.sayHello();
  }

  @TypedRoute.Get('insertIpnitValue')
  async insertInitValue() {
    return this.userService.insertInitValue();
  }
}
