import { Module } from '@nestjs/common';
import { TodoistController } from './todoist.controller';
import { TodoistService } from './todoist.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [TodoistController],
  providers: [TodoistService],
})
export class TodoistModule {}
