import { Body, Controller, Get, Param, Query, Post, UseGuards, Delete, Put } from '@nestjs/common';

import { ProjectService } from './projects.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CurrentUserCtx } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateProjectDto } from './dtos/create-project-inputs.dto';
import { UpdateProjectDto } from './dtos/update-project-inputs.dto';
import { TaskService } from 'src/tasks/tasks.service';

@Controller({ version: '1', path: 'projects' })
@ApiTags('Projects')
@ApiBearerAuth()
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService
  ) { }

  @Post('/')
  @ApiOperation({ summary: 'Create new project' })
  @UseGuards(AccessTokenGuard)
  async createProject(
    @CurrentUserCtx() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const response = await this.projectService.createProject(createProjectDto, user)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Fetch your created projects' })
  @UseGuards(AccessTokenGuard)
  async fetchProjects(
    @CurrentUserCtx() user: User) {
    const response = await this.projectService.fetchProjects(user)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Get('/:project_id')
  @ApiOperation({ summary: 'Fetch details of one project' })
  @UseGuards(AccessTokenGuard)
  async fetchOneProject(
    @CurrentUserCtx() user: User,
    @Param("project_id") project_id: string
  ) {
    const response = await this.projectService.fetchOneProject(user,project_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Delete('/:project_id')
  @ApiOperation({ summary: 'Delete the details of one project' })
  @UseGuards(AccessTokenGuard)
  async deleteOneProject(
    @CurrentUserCtx() user: User,
    @Param("project_id") project_id: string
  ) {
    const response = await this.projectService.deleteOneProject(user,project_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Put('/:project_id')
  @ApiOperation({ summary: 'Update one project' })
  @UseGuards(AccessTokenGuard)
  async updateOneProject(
    @CurrentUserCtx() user: User,
    @Param("project_id") project_id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const response = await this.projectService.updateOneProject(user,project_id, updateProjectDto)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }

  @Get('/:project_id/tasks')
  @ApiOperation({ summary: 'Fetch your created tasks under a project' })
  @UseGuards(AccessTokenGuard)
  async fetchTasks(
    @CurrentUserCtx() user: User,
    @Param('project_id') project_id: string,
  ) {
    const response = await this.taskService.fetchTasks(user, project_id)
    return {
      status_code: 200,
      data: response?.data,
      message: response?.message
    }
  }
}
