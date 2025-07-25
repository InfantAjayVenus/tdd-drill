import { Controller, Get } from '@nestjs/common';
import { TodoistService } from './todoist.service';

@Controller()
export class TodoistController {
  constructor(private readonly todoistService: TodoistService) {}

  @Get()
  getHello(): string {
    return this.todoistService.getHello();
  }
}
