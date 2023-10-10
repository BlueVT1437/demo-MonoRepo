import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
  }
}
