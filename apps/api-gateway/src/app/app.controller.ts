import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto, CreateUserDto } from '../../../../libs/dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.appService.register(dto);
  }
}
