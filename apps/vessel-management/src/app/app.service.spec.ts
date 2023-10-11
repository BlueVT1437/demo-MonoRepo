import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { VesselEntity } from './vessel.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppService', () => {
  let appService: AppService;
  let vesselEntityMock = {
    findAndCount: jest.fn(() => [[new VesselEntity(), new VesselEntity()], 2]),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(VesselEntity),
          useValue: vesselEntityMock,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('AppService - should be defined', () => {
    expect(AppService).toBeDefined();
  });

  describe('getDataVessel', () => {
    it('should return list data and total', async () => {
      const page = 1,
        limit = 10,
        vslCd = '';

      const dataList = [new VesselEntity(), new VesselEntity()];
      const total = 2;

      const findDataBySearch = jest.spyOn(vesselEntityMock, 'findAndCount');
      const result = await appService.getDataVessel(page, limit, vslCd);

      expect(findDataBySearch).toBeCalledTimes(1);
      expect(result).toMatchObject({ data: dataList, total });
    });
  });
});
