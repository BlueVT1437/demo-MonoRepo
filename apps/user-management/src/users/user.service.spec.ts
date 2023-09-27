import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../auth/auth.entity';
import { CreateUserDto } from 'libs/dtos/user.dto';
import { Role } from '../roles/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// import { StudentService } from './student.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let userRepositoryMock = {
    findOne: jest.fn(() => ({
      id: 1,
      email: 'test@gmail.com',
      name: 'test',
    })),
    save: jest.fn(),
    update: jest.fn(),
    findAndCount: jest.fn(),
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
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
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
});
