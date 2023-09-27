import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../auth/auth.entity';
import { CreateUserDto, UpdatePasswordDto, UpdateStatusAccountDto } from 'libs/dtos/user.dto';

describe('UserController', () => {
  let controller: UserController;
	// let service: UserService;
	
  let serviceMock = {
		getUserById: jest.fn(),
		updateUser: jest.fn(),
		searchUsersByMail: jest.fn(),
		updatePassword: jest.fn(),
		deleteUser: jest.fn(),
	}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users and total count', async () => {
      const query = {
        mail: 'example',
        page: 1,
        limit: 10,
      };
      const data = [new User(), new User()];
      const total = 2;

      serviceMock.searchUsersByMail = jest
        .fn()
        .mockResolvedValue({ data, total });

      const result = await controller.getUsers(
        query.mail,
        query.page,
        query.limit
      );

      expect(result).toEqual({ data, total });
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user = new User();

      serviceMock.getUserById = jest.fn().mockResolvedValue(user);

      const result = await controller.getUserById(userId);

      expect(result).toStrictEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should return a message', async () => {
      const userId = 1;
      const updateUserDto: CreateUserDto = {
        name: 'new_username',
        email: 'mail',
      } as CreateUserDto;

      const updatedUser = { message: 'Updated successfully' };

      serviceMock.getUserById = jest.fn().mockResolvedValue(new User());
      serviceMock.updateUser = jest.fn().mockResolvedValue(updatedUser);

      const result = await controller.updateUser(userId, updateUserDto);

      expect(result).toBe(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should return a message', async () => {
      const userId = 1;
      const updateStatus: UpdateStatusAccountDto = {
        isActive: true,
      };

      const resultDeleted = { message: 'Inactive account successfully' };

      serviceMock.deleteUser = jest.fn().mockResolvedValue(resultDeleted);

      const result = await controller.deleteUser(userId, updateStatus);

      expect(result).toEqual(resultDeleted);
    });
  });

	describe('updatePassword', () => {
		it('should return a message', async () => {
			const userId = 1
			const updatePassword: UpdatePasswordDto = {
				password: '123456',
				currentPassword: '123',
			}

			const resultUpdatedPassword = { message: 'Update password successfully' };

			serviceMock.updatePassword = jest.fn().mockResolvedValue(resultUpdatedPassword)

			const result = await controller.updatePassword(userId, updatePassword)

			expect(result).toEqual(resultUpdatedPassword)
		})
	})
});
