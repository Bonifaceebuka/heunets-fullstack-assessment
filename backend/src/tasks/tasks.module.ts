import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { Task, TaskSchema } from './entities/tasks.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entities/user.entity';
import { Project, ProjectSchema } from '../projects/entities/projects.entity';
import { ProjectModule } from '../projects/projects.module';
import { TaskRepository } from './repositories/tasks.respository';
import { UserRepository } from '../auth/repositories/user.respository';
import { ProjectRepository } from '../projects/repositories/projects.respository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
       {
        name: User.name,
        schema: UserSchema,
      },
       {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, UserRepository, ProjectRepository],
  exports: [TaskService],
})
export class TaskModule { }
