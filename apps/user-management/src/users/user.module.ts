import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '../auth/auth.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../roles/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Role])],
	controllers: [UserController],
	providers: [UserService]
})

export class UserModule {}