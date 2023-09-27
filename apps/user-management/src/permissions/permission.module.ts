import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { PermissionController } from './permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
	exports: [PermissionService]
})
export class PermissionModule {}
