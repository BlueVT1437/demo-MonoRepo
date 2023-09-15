import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { Role } from '../roles/role.entity';
import { GoogleStrategy } from './google.stragedy';
import { ProducerService } from '../kafka/producer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      global: true,
      secret: 'gicungduoc',
      signOptions: { expiresIn: '3000s' },
    }),
		PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, ProducerService],
	exports: [LocalStrategy, AuthService]
})
export class AuthModule {}
