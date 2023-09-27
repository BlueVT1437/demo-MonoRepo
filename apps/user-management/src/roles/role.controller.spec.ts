import { RoleController } from './role.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from 'libs/dtos/roles.dto';

describe('RoleController', () => {
  let roleController: RoleController;

  let serviceMock = {
    createRole: jest.fn(),
    getRoles: jest.fn(),
    getPermissionByRole: jest.fn(),
    addPermission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });

  describe('createRole', () => {
    it('should return successful message', async () => {
      const query: CreateRoleDto = {
        role: 'User',
      };
      const outputMessage = 'Created successfully';

      serviceMock.createRole = jest.fn().mockResolvedValue(outputMessage);

      const result = await roleController.createRole(query);

      expect(result).toEqual(outputMessage);
    });
  });

  describe('getRole', () => {
    it('should return a list role', async () => {
      const roles = [new Role(), new Role()];

      serviceMock.getRoles = jest.fn().mockResolvedValue(roles);

      const result = await roleController.getRole();

      expect(result).toEqual(roles);
    });
  });

  describe('getPermissionByRole', () => {
    it('should return list permission of id role', async () => {
      const idRole = 1;
      const role = new Role();

      serviceMock.getPermissionByRole = jest.fn().mockResolvedValue(role);

      const result = await roleController.getPermissionByRole(idRole);

      expect(result).toEqual(role);
    });
  });
});
