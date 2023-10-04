import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoleDto } from 'libs/dtos/roles.dto';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

describe('PermissionService', () => {
  let permissionService: PermissionService;
  let permissionRepositoryMock = {
    find: jest.fn(() => [new Permission(), new Permission()]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getRepositoryToken(Permission),
          useValue: permissionRepositoryMock,
        },
      ],
    }).compile();

    permissionService = module.get<PermissionService>(PermissionService);
  });

  it('PermissionService - should be defined', () => {
    expect(permissionService).toBeDefined();
  });

  describe('getPermissions', () => {
    it('should return role list', async () => {
      const outputData = [new Permission(), new Permission()];

      const result = await permissionService.getPermissions()

      expect(result).toEqual(outputData);
    });
  });
});
