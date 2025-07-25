import { Test, TestingModule } from '@nestjs/testing';
import { TodoistController } from './todoist.controller';
import { TodoistService } from './todoist.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TodoistController', () => {
  let todoistController: TodoistController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoistController],
      providers: [TodoistService],
    }).compile();

    todoistController = app.get<TodoistController>(TodoistController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(todoistController.getHello()).toBe('Hello World!');
    });
  });
});
