import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getPermissions() {
    return await this.permissionRepository.find();
  }
}
