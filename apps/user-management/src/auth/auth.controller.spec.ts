import { AuthController } from './auth.controller';

import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoleDto } from 'libs/dtos/roles.dto';
import { AuthService } from './auth.service';

describe('RoleController', () => {
  let authController: AuthController;

  let serviceMock = {
    validateUser: jest.fn(),
    register: jest.fn(),
    signIn: jest.fn(),
    googleLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(AuthController).toBeDefined();
  });

  // describe('validateUser', () => {
  //   it('should return successful message', async () => {
  //     const query: CreateRoleDto = {
  //       role: 'User',
  //     };
  //     const outputMessage = 'Created successfully';

  //     serviceMock.createRole = jest.fn().mockResolvedValue(outputMessage);

  //     const result = await roleController.createRole(query);

  //     expect(result).toEqual(outputMessage);
  //   });
  // });
});
