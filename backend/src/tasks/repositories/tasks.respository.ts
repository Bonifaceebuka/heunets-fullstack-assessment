import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../entities/tasks.entity';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class TaskRepository extends BaseRepository<Task>{
  private readonly logger: Logger;

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {
    super(taskModel);
    this.logger = new Logger(TaskRepository.name);
  }
}