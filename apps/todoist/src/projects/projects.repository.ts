import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsRepository {
  private projects: Project[] = [];

  findAll(): Project[] {
    return [...this.projects];
  }

  findById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  save(createProjectDto: CreateProjectDto): Project {
    const project: Project = {
      id: crypto.randomUUID(),
      name: createProjectDto.name,
      description: createProjectDto.description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.projects.push(project);
    return project;
  }
}
