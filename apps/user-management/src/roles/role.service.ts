import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import {
  AddPermissionDto,
  CreateRoleDto,
} from '../../../../libs/dtos/roles.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async createRole(dto: CreateRoleDto) {
    const existedRole = await this.roleRepository.find({
      where: {
        role: dto.role,
      },
    });

    if (existedRole.length === 0) {
      const todo = await this.roleRepository.create(dto);

      await this.roleRepository.save(todo);
      return { message: 'Created successfully' };
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
    // const permission = this.permissionService.findPermissionsByIds(
    //   bodyDto.idPermission
    // );

    console.log('bodyDto', bodyDto);

    // await this.roleRepository.update(
    //   { id: Number(bodyDto.idRole) },
    //   { permissions: bodyDto.idPermission as any }
    // );

    // return { message: 'Inactive account successfully' };
  }
}
