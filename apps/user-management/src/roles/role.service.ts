import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import {
  AddPermissionDto,
  CreateRoleDto,
} from '../../../../libs/dtos/roles.dto';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async createRole(dto: CreateRoleDto) {
    const existedRole = await this.roleRepository.findOne({
      where: {
        role: dto.role,
      },
    });

    if (!existedRole) {
      const todo = await this.roleRepository.create(dto);

      await this.roleRepository.save(todo);
      return { message: 'Created successfully!' };
    } else {
      throw new HttpException('Role is existed', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async getRoles() {
    return await this.roleRepository.find();
  }

  async getPermissionByRole(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
      relations: {
        permissions: true,
      },
    });
  }

  async addPermission(bodyDto: AddPermissionDto) {
    const existedRole = await this.roleRepository.findOne({
      where: {
        id: Number(bodyDto.idRole),
      },
    });

    const listPermissionSelected = [];
    for (let i = 0; i < bodyDto.idPermission.length; i++) {
      const permissionSelected = await this.permissionRepository.findOne({
        where: {
          id: bodyDto.idPermission[i],
        },
      });

      listPermissionSelected.push(permissionSelected);
    }

    const newRole = { ...existedRole, permissions: listPermissionSelected };
    await this.roleRepository.save(newRole);

    return { message: 'Update permissions successfully' };
  }
}
