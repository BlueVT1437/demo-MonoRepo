import { AppController } from './app.controller';

import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
	let service: AppService
	const AppServiceMock = {
	}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
				provide: AppService,
				useValue: AppServiceMock
			}],
    }).compile();

    controller = module.get<AppController>(AppController);
		service = module.get<AppService>(AppService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});