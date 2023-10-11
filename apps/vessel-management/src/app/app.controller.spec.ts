import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VesselEntity } from './vessel.entity';

describe('AppController', () => {
  let appServiceMock = {
    getDataVessel: jest.fn(),
  };
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(AppController).toBeDefined();
  });

  describe('getDataVessel', () => {
    it('should return a object contain list data and total', async () => {
      const outputData = {
        data: [new VesselEntity(), new VesselEntity()],
        total: 2,
      };

      appServiceMock.getDataVessel = jest.fn().mockResolvedValue(outputData);
      const result = await appController.getDataVessel(1, 10, '');

      expect(result).toStrictEqual(outputData);
    });
  });
});
