import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../entities/projects.entity';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {
    super(projectModel);
    this.logger = new Logger(ProjectRepository.name);
  }
}