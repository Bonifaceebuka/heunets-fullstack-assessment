import { Injectable, Logger } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.respository';
import { CreateProjectDto } from './dtos/create-project-inputs.dto';
import { ServiceResponseDTO } from 'src/shared/types/Ihttp.response';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProjectService {
  private readonly logger: Logger;
    constructor(
      private readonly projectRepository: ProjectRepository
    ) {
      this.logger = new Logger(ProjectService.name);
    }

  async createProject(createProjectDto: CreateProjectDto, user: User): Promise<ServiceResponseDTO> {
      const { name, description } = createProjectDto;
      let message;
  
      const project = await this.projectRepository.create({
        name, description,
        user: user?._id
      });
  
      this.logger.log(`Project created successfully with : ${JSON.stringify(createProjectDto)}`)
      return {
        successful: true,
        data: {
          id: project?._id,
          full_name: project?.name
        },
        message: "Your project was created successfully!"
      };
    }
}
