import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, CreateUserDto } from '../../../../libs/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';

interface tokenForm {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }

  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @MessagePattern({ cmd: 'login' })
  async loginAPIGateway(value: LoginDto) {
    const access_token = await this.authService.signIn(value);
    return of(access_token);
  }

  @MessagePattern({ cmd: 'register' })
  async registerAPIGateway(value: CreateUserDto) {
    this.authService.register(value);
    return of(value);
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('google');
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const data = await this.authService.googleLogin(req) as tokenForm;

    res.redirect(`http://localhost:3030/home?token=${data.access_token}`);
  }
}
