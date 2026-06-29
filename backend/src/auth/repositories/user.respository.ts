import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User>{
  private readonly logger: Logger;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
    this.logger = new Logger(UserRepository.name);
  }
}