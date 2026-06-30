import { Injectable, Logger } from '@nestjs/common';
import { ProjectRepository } from './repositories/projects.respository';
import { CreateProjectDto } from './dtos/create-project-inputs.dto';
import { ServiceResponseDTO } from 'src/shared/types/Ihttp.response';
import { User } from 'src/auth/entities/user.entity';
import { Types } from 'mongoose';
import { AppError } from 'src/shared/handlers/errors/AppError';
import { dynamic_messages } from 'src/shared/constants/messages';
import { UpdateProjectDto } from './dtos/update-project-inputs.dto';

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
    const project = await this.projectRepository.create({
      name,
      description,
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

  async fetchProjects(user: User): Promise<ServiceResponseDTO> {
    const projects = await this.projectRepository.findMany({
      user: user?._id
    });

    return {
      successful: true,
      data: projects,
      message: "Your projects were fetched successfully!"
    };
  }

  async fetchOneProject(user: User, project_id: string): Promise<ServiceResponseDTO> {
    let message;

    if (!project_id) {
      message = "Project ID is required!"
      this.logger.error(message)
      throw new AppError(message)
    }
    const projectId = new Types.ObjectId(project_id);
    const project = await this.projectRepository.findOne({
      user: user?._id,
      _id: projectId
    });

    if (!project) {
      message = dynamic_messages.NOT_FOUND(`Project with ID ${project_id}`)
      this.logger.error(message)
      throw new AppError(message)
    }
    return {
      successful: true,
      data: project,
      message: "Your project details was fetched successfully!"
    };
  }

  async deleteOneProject(user: User, project_id: string): Promise<ServiceResponseDTO> {
    let message;

    if (!project_id) {
      message = "Project ID is required!"
      this.logger.error(message)
      throw new AppError(message)
    }
    const projectId = new Types.ObjectId(project_id);
    const project = await this.projectRepository.findOne({
      user: user?._id,
      _id: projectId
    });

    if (!project) {
      message = dynamic_messages.NOT_FOUND(`Project with ID ${project_id}`)
      this.logger.error(message)
      throw new AppError(message)
    }

    await this.projectRepository.delete({
      _id: projectId,
      user: user?._id
    });
    return {
      successful: true,
      data: null,
      message: "Your project details was deleted successfully!"
    };
  }

  async updateOneProject(user: User, project_id: string, updateProjectDto: UpdateProjectDto): Promise<ServiceResponseDTO> {
    let message;
    const submittedFields: any = Object.fromEntries(
      Object.entries({
        name: updateProjectDto?.name,
        description: updateProjectDto?.description,
      }).filter(([, value]) => value !== undefined)
    );
    if (!project_id) {
      message = "Project ID is required!"
      this.logger.error(message)
      throw new AppError(message)
    }
    const projectId = new Types.ObjectId(project_id);
    const project = await this.projectRepository.findOne({
      user: user?._id,
      _id: projectId
    });

    if (!project) {
      message = dynamic_messages.NOT_FOUND(`Project with ID ${project_id}`)
      this.logger.error(message)
      throw new AppError(message)
    }

    console.log({updateProjectDto})
    console.log({submittedFields})
    console.log({project_id})
    await this.projectRepository.updateOne({
      user: user?._id,
      _id: projectId
    }, { ...submittedFields });
    return {
      successful: true,
      data: project,
      message: "Your project details was updated successfully!"
    };
  }
}
