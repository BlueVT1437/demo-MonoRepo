import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../auth/auth.entity';
import { CreateUserDto, UpdatePasswordDto } from 'libs/dtos/user.dto';
import { Role } from '../roles/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

// import { StudentService } from './student.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock = {
    findOne: jest.fn(() => ({
      id: 1,
      email: 'test@gmail.com',
      name: 'test',
      password: bcrypt.hashSync('123', 10),
    })),
    save: jest.fn(),
    update: jest.fn(),
    findAndCount: jest.fn(() => [[new User(), new User()], 2]),
  };

  let roleRepositoryMock = {
    findOne: jest.fn(() => ({
      id: 1,
      role: 'Admin',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('UserService - should be defined', () => {
    expect(UserService).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const findOneSpy = jest.spyOn(userRepositoryMock, 'findOne');

      const foundUser = await userService.getUserById(userId);

      expect(foundUser.id).toEqual(userId);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id: userId },
        relations: {
          role: true,
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should return a message updated successfully', async () => {
      const userId = 1;
      const userDto: CreateUserDto = {
        name: 'new_username',
        email: 'mail',
      } as CreateUserDto;

      const findUserSpy = jest.spyOn(userRepositoryMock, 'findOne');
      const updateRole = jest.spyOn(userRepositoryMock, 'save');

      const result = await userService.updateUser(userDto, userId);
      const messageOutput = { message: 'Updated successfully' };

      expect(result).toEqual(messageOutput);
      expect(findUserSpy).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(updateRole).toBeCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should return a message', async () => {
      const userId = 1;
      const isActive = false;
      const messageOutput = { message: 'Inactive account successfully' };

      const updateStatus = jest.spyOn(userRepositoryMock, 'update');
      const result = await userService.deleteUser(userId, isActive);

      expect(result).toEqual(messageOutput);
      expect(updateStatus).toBeCalledWith({ id: userId }, { status: isActive });
    });
  });

  describe('updatePassword', () => {
    it('should return a message', async () => {
      const userId = 1;
      const updatePasswordDto: UpdatePasswordDto = {
        password: '123',
        currentPassword: '123',
      };
      const messageOutput = { message: 'Update password successfully' };

      const existedUser = jest.spyOn(userRepositoryMock, 'findOne');
      const result = await userService.updatePassword(
        userId,
        updatePasswordDto
      );

      expect(existedUser).toBeCalledWith({
        where: {
          id: Number(userId),
        },
      });
      expect(result).toEqual(messageOutput);
    });
  });

  describe('searchUsersByMail', () => {
    it('should return a data list and total items', async () => {
      const mail = 'test@gmail.com';
      const page = 1;
      const limit = 10;

      const outputData = { data: [new User(), new User()], total: 2 };

      const getAllUser = jest.spyOn(userRepositoryMock, 'findAndCount');
      const result = await userService.searchUsersByMail(mail, page, limit);

      expect(result).toEqual(outputData);
      expect(getAllUser).toBeCalledTimes(1);
    });
  });
});
