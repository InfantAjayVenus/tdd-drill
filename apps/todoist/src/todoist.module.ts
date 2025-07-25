import { Module } from '@nestjs/common';
import { TodoistController } from './todoist.controller';
import { TodoistService } from './todoist.service';

@Module({
  imports: [],
  controllers: [TodoistController],
  providers: [TodoistService],
})
export class TodoistModule {}
