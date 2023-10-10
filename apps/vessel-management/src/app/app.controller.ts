import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('vessel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDataVessel(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('vslCd') vslCd: string
  ) {
    return this.appService.getDataVessel(page, limit, vslCd);
  }
}
