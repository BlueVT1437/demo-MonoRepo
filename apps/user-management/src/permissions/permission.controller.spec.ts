import { PermissionController } from './permission.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';

describe('PermissionController', () => {
  let permissionController: PermissionController;

  let serviceMock = {
    getPermissions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        {
          provide: PermissionService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    permissionController =
      module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(permissionController).toBeDefined();
  });

  describe('getPermission', () => {
    it('should return permission list', async () => {
      const dataOutput = [new Permission(), new Permission()];

      serviceMock.getPermissions = jest.fn().mockResolvedValue(dataOutput);

      const result = await permissionController.getPermission();

      expect(result).toEqual(dataOutput);
    });
  });
});
