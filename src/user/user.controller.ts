import { Controller } from '@nestjs/common';
import { TypedRoute } from '@nestia/core';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get('sayHello')
  async sayHello() {
    return this.userService.sayHello();
  }

  @TypedRoute.Get('insertIpnitValue')
  async insertInitValue() {
    return this.userService.insertInitValue();
  }
}
