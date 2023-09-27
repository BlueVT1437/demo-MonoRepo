import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDataVessel(page: number, limit: number) {
    return { message: 'Hello API' };
  }
}
