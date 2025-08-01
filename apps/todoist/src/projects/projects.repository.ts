import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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

  update(id: string, updateProjectDto: UpdateProjectDto): Project | undefined {
    const projectIndex = this.projects.findIndex(project => project.id === id);
    if (projectIndex === -1) {
      return undefined;
    }

    const existingProject = this.projects[projectIndex];
    const updatedProject: Project = {
      ...existingProject,
      name: updateProjectDto.name,
      description: updateProjectDto.description,
      updatedAt: new Date()
    };

    this.projects[projectIndex] = updatedProject;
    return updatedProject;
  }
}
