import { Body, Controller, Get, Param, Query, Post, UseGuards, Delete, Put } from '@nestjs/common';

import { TaskService } from './tasks.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CurrentUserCtx } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTaskDto } from './dtos/create-task-inputs.dto';
import { UpdateTaskDto } from './dtos/update-task-inputs.dto';

@Controller({ version: '1', path: 'tasks' })
@ApiTags('Tasks')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('/:project_id/create')
  @ApiOperation({ summary: 'Create new task' })
  @UseGuards(AccessTokenGuard)
  async createTask(
    @CurrentUserCtx() user: User,
    @Param('project_id') project_id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const response = await this.taskService.createTask(createTaskDto, user, project_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Get('/:task_id')
  @ApiOperation({ summary: 'Fetch details of one task' })
  @UseGuards(AccessTokenGuard)
  async fetchOneTask(
    @CurrentUserCtx() user: User,
    @Param("task_id") task_id: string
  ) {
    const response = await this.taskService.fetchOneTask(user,task_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Delete('/:task_id')
  @ApiOperation({ summary: 'Delete the details of one task' })
  @UseGuards(AccessTokenGuard)
  async deleteOneTask(
    @CurrentUserCtx() user: User,
    @Param("task_id") task_id: string
  ) {
    const response = await this.taskService.deleteOneTask(user,task_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

   @Put('/:task_id')
  @ApiOperation({ summary: 'Update one task' })
  @UseGuards(AccessTokenGuard)
  async updateOneTask(
    @CurrentUserCtx() user: User,
    @Param("task_id") task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const response = await this.taskService.updateOneTask(user,task_id, updateTaskDto)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }
}
