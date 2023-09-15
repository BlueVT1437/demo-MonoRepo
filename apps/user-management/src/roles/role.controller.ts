import { Controller, Body, Post, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from 'libs/dtos/roles.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get()
  getRole() {
    return this.roleService.getRoles();
  }
}
