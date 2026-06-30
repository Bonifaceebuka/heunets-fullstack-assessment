import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/projects/entities/projects.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Schema()
export class Task extends BaseEntity {
  @Prop({ required: true})
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ enum: ['todo', 'in_progress', 'completed'], default: 'todo' })
  status!: string;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority!: string;

  @Prop({  default: null, required: false })
  start_date?: string;

  @Prop({  default: null, required: false })
  end_date!: string;

@Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: false,
    index: true,
  })
  assigned_to?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  user!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Project.name,
    required: true,
    index: true,
  })
  project!: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = HydratedDocument<Task>;