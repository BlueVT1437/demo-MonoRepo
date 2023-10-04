import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todo } from './todos.entity';
import { CreateTodoDto } from 'libs/dtos/todo.dto';

// import { StudentService } from './student.service';

describe('UserService', () => {
  let todoService: TodosService;
  let todoRepository: Repository<Todo>;
  let todoRepositoryMock = {
    create: jest.fn(),
    findOne: jest.fn(() => ({
      id: 1,
      title: 'test title',
      description: 'test',
    })),
    save: jest.fn(),
    findAndCount: jest.fn(() => [[new Todo(), new Todo()], 2]),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: todoRepositoryMock,
        },
      ],
    }).compile();

    todoService = module.get<TodosService>(TodosService);
  });

  it('TodoService - should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('create', () => {
    it('should return message Created successfully', async () => {
      const todoDto: CreateTodoDto = {
        title: 'test title',
        description: 'test content',
      };

      const todo = jest.spyOn(todoRepositoryMock, 'create');
      const todoSave = jest.spyOn(todoRepositoryMock, 'save');
      const result = await todoService.create(todoDto);

      const messageOutput = { message: 'Created successfully!' };

      expect(todo).toBeCalledTimes(1);
      expect(todoSave).toBeCalledTimes(1);
      expect(result).toEqual(messageOutput);
    });
  });

  describe('getAll', () => {
    it('should return todo list and total items', async () => {
      const todo = jest.spyOn(todoRepositoryMock, 'findAndCount');
      const result = await todoService.getAll();

      const outputData = { data: [new Todo(), new Todo()], total: 2 };

      expect(todo).toBeCalledTimes(1);
      expect(result).toEqual(outputData);
    });
  });

  describe('getDetail', () => {
    it('should return a todo by id', async () => {
      const todoId = 1;
      const todo = jest.spyOn(todoRepositoryMock, 'findOne');
      const result = await todoService.getDetail(todoId);

      expect(todo).toBeCalledTimes(1);
      expect(result.id).toEqual(todoId);
    });
  });

  describe('update', () => {
    it('should return message updated successfully', async () => {
      const todoId = 1;
      const todoDto: CreateTodoDto = {
        title: 'test title',
        description: 'test',
      };

      const todo = jest.spyOn(todoRepositoryMock, 'findOne');
      const todoSave = jest.spyOn(todoRepositoryMock, 'save');
      const result = await todoService.update(todoId, todoDto);

      const outputTodo = {
        id: 1,
        title: 'test title',
        description: 'test',
      };
      const messageOutput = { message: 'Updated successfully!' };

      expect(todo).toBeCalledWith({ where: { id: todoId } });
      expect(todoSave).toBeCalledWith(outputTodo);
      expect(result).toEqual(messageOutput);
    });
  });

  describe('delete', () => {
    it('should return message deleted successfully', async () => {
      const todoId = 1;
      const todo = jest.spyOn(todoRepositoryMock, 'remove');
      const result = await todoService.delete(todoId);

      const messageOutput = { message: 'Deleted successfully!' };

      expect(todo).toBeCalledTimes(1);
      expect(result).toEqual(messageOutput);
    });
  });
});
