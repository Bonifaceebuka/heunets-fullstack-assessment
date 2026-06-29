import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export abstract class BaseEntity {
  _id!: Types.ObjectId;

  @Prop({
    default: null,
  })
  deletedAt?: Date;

  createdAt!: Date;

  updatedAt!: Date;
}