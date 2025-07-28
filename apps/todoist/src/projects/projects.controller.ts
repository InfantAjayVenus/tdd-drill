import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  @Get()
  findAll(): Project[] {
    return [];
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Project {
    return {
      id: crypto.randomUUID(),
      name: createProjectDto.name,
      description: createProjectDto.description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
