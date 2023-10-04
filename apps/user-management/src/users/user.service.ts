import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/auth.entity';
import { Repository, Like } from 'typeorm';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from '../../../../libs/dtos/user.dto';
import { Role } from '../roles/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
  }

  async updateUser(user: CreateUserDto, id: number) {
    const todo = await this.userRepository.findOne({ where: { id } });
    const existedRoleList = [];

    if (user.role) {
      for (let i = 0; i < user.role.length; i++) {
        const existedRole = await this.roleRepository.findOne({
          where: {
            id: Number(user.role[i]),
          },
        });

        existedRoleList.push(existedRole);
      }
      user.role = existedRoleList;
    }

    Object.assign(todo, user);

    await this.userRepository.save(todo);
    return { message: 'Updated successfully' };
  }

  async deleteUser(id: number, isActive: boolean) {
    await this.userRepository.update({ id }, { status: isActive });
    return { message: 'Inactive account successfully' };
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    const isMatch = bcrypt.compareSync(
      dto.currentPassword,
      existedUser.password
    );
    if (isMatch) {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);

      await this.userRepository.update({ id }, { password: hashPassword });
      return { message: 'Update password successfully' };
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Wrong credentials!',
      },
      HttpStatus.BAD_REQUEST
    );
  }

  async searchUsersByMail(
    mail: string,
    page: number,
    limit: number
  ): Promise<object> {
    const [allUsers, total] = await this.userRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        email: Like(`%${mail}%`),
      },
      relations: {
        role: true,
      },
    });

    return { data: allUsers, total };
  }
}
