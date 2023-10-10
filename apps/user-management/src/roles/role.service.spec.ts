import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from 'libs/dtos/roles.dto';
import { Permission } from '../permissions/permission.entity';
import { PermissionService } from '../permissions/permission.service';

describe('UserService', () => {
  let roleService: RoleService;
  let roleRepositoryMock = {
    create: jest.fn(),
    findOne: jest.fn(() => {}),
    save: jest.fn(),
    find: jest.fn(() => [new Role(), new Role()]),
    remove: jest.fn(),
  };
  let permissionRepositoryMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        PermissionService,
        {
          provide: getRepositoryToken(Role),
          useValue: roleRepositoryMock,
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: permissionRepositoryMock,
        },
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
  });

  it('RoleService - should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('createRole', () => {
    it('should return message Created successfully', async () => {
      const roleDto: CreateRoleDto = {
        role: 'test admin',
      };

      const existedRole = jest.spyOn(roleRepositoryMock, 'findOne');
      const createRole = jest.spyOn(roleRepositoryMock, 'create');
      const result = await roleService.createRole(roleDto);

      const messageOutput = { message: 'Created successfully!' };

      expect(existedRole).toBeCalledTimes(1);
      expect(createRole).toBeCalledWith(roleDto);
      expect(result).toEqual(messageOutput);
    });
  });

  describe('getRoles', () => {
    it('should return role list', async () => {
      const outputData = [new Role(), new Role()];

      const result = await roleService.getRoles();

      expect(result).toEqual(outputData);
    });
  });

  describe('getPermissionByRole', () => {
    it('should return permission list', async () => {
      const roleId = 1;

      const result = await roleService.getPermissionByRole(roleId);

      expect(result).toBe(undefined);
    });
  });
});
