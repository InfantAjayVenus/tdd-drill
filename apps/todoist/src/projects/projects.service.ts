import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  findAll(): Project[] {
    return this.projectsRepository.findAll();
  }

  findOne(id: string): Project | undefined {
    return this.projectsRepository.findById(id);
  }

  create(createProjectDto: CreateProjectDto): Project {
    return this.projectsRepository.save(createProjectDto);
  }
}
