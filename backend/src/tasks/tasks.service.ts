import { Injectable, Logger } from '@nestjs/common';
import { TaskRepository } from './repositories/tasks.respository';
import { CreateTaskDto } from './dtos/create-task-inputs.dto';
import { ServiceResponseDTO } from 'src/shared/types/Ihttp.response';
import { User } from 'src/auth/entities/user.entity';
import { Types } from 'mongoose';
import { AppError } from 'src/shared/handlers/errors/AppError';
import { dynamic_messages } from 'src/shared/constants/messages';
import { UpdateTaskDto } from './dtos/update-task-inputs.dto';
import { ProjectRepository } from 'src/projects/repositories/projects.respository';
import { UserRepository } from 'src/auth/repositories/user.respository';

@Injectable()
export class TaskService {
  private readonly logger: Logger;
    constructor(
      private readonly taskRepository: TaskRepository,
      private readonly userRepository: UserRepository,
      private readonly projectRepository: ProjectRepository
    ) {
      this.logger = new Logger(TaskService.name);
    }

  async createTask(createTaskDto: CreateTaskDto, user: User, project_id: string): Promise<ServiceResponseDTO> {
      const { title, description, priority,status,start_date,end_date,assigned_to } = createTaskDto;  
      let message;
    let assignedTo

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

    if(assigned_to){
   const assignedToId = new Types.ObjectId(assigned_to);
    assignedTo = await this.userRepository.findOne({
      _id: assignedToId
    });
    }

    if (!project) {
      message = dynamic_messages.NOT_FOUND(`Project with ID ${project_id}`)
      this.logger.error(message)
      throw new AppError(message)
    }
      const task = await this.taskRepository.create({
        title, 
        description,
        status,
        priority,
        start_date,
        end_date,
        assigned_to: assignedTo?._id,
        created_by: user?._id,
        project: project._id
      });
  
      this.logger.log(`Task created successfully with : ${JSON.stringify(createTaskDto)}`)
      return {
        successful: true,
        data: {
          id: task?._id,
          full_name: task?.title
        },
        message: "Your task was created successfully!"
      };
    }

    async fetchTasks(user: User, project_id: string): Promise<ServiceResponseDTO> {
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
      const tasks = await this.taskRepository.findMany({
        user: user?._id,
        project: project._id
      });
  
      return {
        successful: true,
        data: tasks,
        message: "Your tasks were fetched successfully!"
      };
    }

    async fetchOneTask(user: User, task_id: string): Promise<ServiceResponseDTO> {
      let message;

      if(!task_id){
        message = "Task ID is required!"
        this.logger.error(message)
        throw new AppError(message)
      }
      const taskId = new Types.ObjectId(task_id);
      const task = await this.taskRepository.findOne({
        user: user?._id,
        _id: taskId
      });
  
      if(!task){
        message = dynamic_messages.NOT_FOUND(`Task with ID ${task_id}`)
        this.logger.error(message)
        throw new AppError(message)
      }
      return {
        successful: true,
        data: task,
        message: "Your task details was fetched successfully!"
      };
    }

    async deleteOneTask(user: User, task_id: string): Promise<ServiceResponseDTO> {
      let message;

      if(!task_id){
        message = "Task ID is required!"
        this.logger.error(message)
        throw new AppError(message)
      }
      const taskId = new Types.ObjectId(task_id);
      const task = await this.taskRepository.findOne({
        user: user?._id,
        _id: taskId
      });
  
      if(!task){
        message = dynamic_messages.NOT_FOUND(`Task with ID ${task_id}`)
        this.logger.error(message)
        throw new AppError(message)
      }

      await this.taskRepository.delete({
        _id: taskId,
        user: user?._id
      });
      return {
        successful: true,
        data: null,
        message: "Your task details was deleted successfully!"
      };
    }

    async updateOneTask(user: User, task_id: string, updateTaskDto: UpdateTaskDto): Promise<ServiceResponseDTO> {
      let message;
      const submittedFields: any = Object.fromEntries(
            Object.entries({
                name: updateTaskDto?.name,
                description: updateTaskDto?.description,
            }).filter(([, value]) => value !== undefined)
        );
      if(!task_id){
        message = "Task ID is required!"
        this.logger.error(message)
        throw new AppError(message)
      }
      const taskId = new Types.ObjectId(task_id);
      const task = await this.taskRepository.findOne({
        user: user?._id,
        _id: taskId
      });
  
      if(!task){
        message = dynamic_messages.NOT_FOUND(`Task with ID ${task_id}`)
        this.logger.error(message)
        throw new AppError(message)
      }

      await this.taskRepository.updateOne({
        user: user?._id,
        _id: taskId
      },{...submittedFields});
      return {
        successful: true,
        data: task,
        message: "Your task details was updated successfully!"
      };
    }
}
