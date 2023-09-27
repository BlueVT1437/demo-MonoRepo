import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { AddPermissionDto, CreateRoleDto } from 'libs/dtos/roles.dto';

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

  @Get(':id')
  getPermissionByRole(@Param('id') id: number) {
    return this.roleService.getPermissionByRole(id);
  }

  @Put()
  addPermission(@Body() bodyDto: AddPermissionDto) {
    return this.roleService.addPermission(bodyDto);
  }
}
