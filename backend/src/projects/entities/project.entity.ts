import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Schema()
export class Project extends BaseEntity {
  @Prop({ required: true})
  name!: string;

  @Prop({ required: true })
  description!: string;

@Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  user!: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
export type ProjectDocument = HydratedDocument<Project>;