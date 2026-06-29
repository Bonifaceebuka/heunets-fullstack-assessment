import { Body, Controller, Get, Param, Query, Post, UseGuards } from '@nestjs/common';

import { ProjectService } from './projects.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CurrentUserCtx } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateProjectDto } from './dtos/create-project-inputs.dto';

@Controller({ version: '1', path: 'projects' })
@ApiTags('Projects')
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('/')
  @ApiOperation({ summary: 'Create new project' })
@UseGuards(AccessTokenGuard)
  async uploadCandidateDocument(
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
}
