import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getPermission() {
    return this.permissionService.getPermissions();
  }
}
