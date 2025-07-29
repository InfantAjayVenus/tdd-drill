import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Project[] {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Project {
    return this.projectsService.create(createProjectDto);
  }
}
