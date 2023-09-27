import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
// import { CreateUserEvent } from '../../../google-login/src/test/create-user.event';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateStatusAccountDto,
} from '../../../../libs/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Query('mail') mail: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.userService.searchUsersByMail(mail, page, limit);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(dto, id);
  }

  @Put('/password/:id')
  updatePassword(@Param('id') id: number, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, dto);
  }

  @Put('/delete/:id')
  deleteUser(@Param('id') id: number, @Body() body: UpdateStatusAccountDto) {
    return this.userService.deleteUser(id, body.isActive);
  }
}
