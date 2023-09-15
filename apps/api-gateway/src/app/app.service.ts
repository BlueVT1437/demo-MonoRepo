import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { LoginDto, CreateUserDto } from 'libs/dtos/user.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_GATEWAY') private readonly clientServiceA: ClientProxy,
  ) {}

  login(payloadLogin: LoginDto) {
    const pattern = { cmd: 'login' };
    const payload = payloadLogin;

    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }

  register(payloadRegister: CreateUserDto) {
    const pattern = { cmd: 'register' };
    const payload = payloadRegister;

    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(map((message: string) => ({ message })));
  }
}
