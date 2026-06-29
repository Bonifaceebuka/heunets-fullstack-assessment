import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export abstract class BaseEntity {
  _id!: Types.ObjectId;

  @Prop({
    default: null,
  })
  deleted_at?: Date;

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}