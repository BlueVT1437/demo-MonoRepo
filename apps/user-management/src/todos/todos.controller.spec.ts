import { TodosController } from './todos.controller';

import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { JwtService } from '@nestjs/jwt';

describe('TodoController', () => {
  let todoController: TodosController;

  let serviceMock = {
    create: jest.fn(),
    getAll: jest.fn(),
    getDetail: jest.fn(),
  };

	
  let jwtServiceMock = {
    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: serviceMock,
        },
				{
					provide: JwtService, 
					useValue: jwtServiceMock
				}
      ],
    }).compile();

    todoController = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

});
