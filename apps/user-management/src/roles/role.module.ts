import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
