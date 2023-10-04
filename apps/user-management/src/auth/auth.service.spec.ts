import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoleDto } from 'libs/dtos/roles.dto';
import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { Role } from '../roles/role.entity';
import { JwtService } from '@nestjs/jwt';
import { ProducerService } from '../kafka/producer.service';
import { LoginDto } from 'libs/dtos/user.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let producerService: ProducerService;
  let userRepositoryMock = {
    findOne: jest.fn(() => ({
      email: 'test@gmail',
      password: '123',
    })),
  };
  let roleRepositoryMock = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepositoryMock,
        },
        ProducerService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('AuthService - should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data', async () => {
      const outputData = {
        email: 'test@gmail',
        password: '123',
      };
      const userDto: LoginDto = {
        email: 'test@gmail',
        password: '123',
      };

      const findUser = jest.spyOn(userRepositoryMock, 'findOne');
      const result = await authService.validateUser(
        userDto.email,
        userDto.password
      );

      expect(findUser).toBeCalledTimes(1);
      expect(result).toEqual(outputData);
    });
  });
});
