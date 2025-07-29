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

  create(createProjectDto: CreateProjectDto): Project {
    return this.projectsRepository.save(createProjectDto);
  }
}
