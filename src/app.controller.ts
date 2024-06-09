import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TypedRoute } from '@nestia/core';

type aa = {
  bb: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TypedRoute.Get('/aa')
  async getHello(): Promise<aa> {
    return { bb: 'dsa' };
  }
}
