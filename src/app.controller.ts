import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TypedRoute } from '@nestia/core';
import { Public } from './auth/public.deco';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
