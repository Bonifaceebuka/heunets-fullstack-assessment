import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { Project, ProjectSchema } from './entities/projects.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/tasks/entities/tasks.entity';
import { ProjectRepository } from './repositories/projects.respository';
import { TaskService } from '../tasks/tasks.service';
import { TaskRepository } from 'src/tasks/repositories/tasks.respository';
import { UserRepository } from 'src/auth/repositories/user.respository';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
       {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, TaskService, TaskRepository, UserRepository],
  exports: [ProjectService],
})
export class ProjectModule { }
