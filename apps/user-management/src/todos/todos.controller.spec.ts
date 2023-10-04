import { TodosController } from './todos.controller';

import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { JwtService } from '@nestjs/jwt';
import { CreateTodoDto } from 'libs/dtos/todo.dto';
import { Todo } from './todos.entity';

describe('TodoController', () => {
  let todoController: TodosController;

  let serviceMock = {
    create: jest.fn(),
    getAll: jest.fn(),
    getDetail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  let jwtServiceMock = {};

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
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    todoController = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  describe('create', () => {
    it('should return message Created successfully', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'test',
        description: 'test description',
      };
      const messageOutput = 'Created successfully!';

      serviceMock.create = jest.fn().mockResolvedValue(messageOutput);

      const result = await todoController.create(createTodoDto);

      expect(result).toStrictEqual(messageOutput);
    });
  });

  describe('getAll', () => {
    it('should return todo list and total todo item', async () => {
      const listTodoOutput = [new Todo(), new Todo()];
      const total = 2;

      serviceMock.getAll = jest
        .fn()
        .mockResolvedValue({ data: listTodoOutput, total });

      const result = await todoController.getAll();

      expect(result).toEqual({ data: listTodoOutput, total });
    });
  });

  describe('getDetail', () => {
    it('should return a todo item', async () => {
      const userId = 1;
      const todoItem = new Todo();

      serviceMock.getDetail = jest.fn().mockResolvedValue(todoItem);

      const result = await todoController.getDetail(userId);

      expect(result).toEqual(todoItem);
    });
  });

  describe('updateTodo', () => {
    it('should return message Updated successfully', async () => {
      const todoId = 1;
      const todoDto: CreateTodoDto = {
        title: 'title',
        description: 'test content',
      };

      serviceMock.update = jest
        .fn()
        .mockResolvedValue({ message: 'Updated successfully!' });

      const messageOutput = 'Updated successfully!';
      const result = await todoController.updateTodo(todoId, todoDto);

      expect(result).toEqual({ message: messageOutput });
    });
  });

	describe('deleteTodo', () => {
    it('should return message Deleted successfully', async () => {
      const todoId = 1;

      serviceMock.delete = jest
        .fn()
        .mockResolvedValue({ message: 'Deleted successfully!' });

      const messageOutput = 'Deleted successfully!';
      const result = await todoController.deleteTodo(todoId)

      expect(result).toEqual({ message: messageOutput });
    });
  });
});
