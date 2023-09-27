import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDataVessel(@Query('page') page: number, @Query('limit') limit: number) {
    return this.appService.getDataVessel(page, limit);
  }
}
