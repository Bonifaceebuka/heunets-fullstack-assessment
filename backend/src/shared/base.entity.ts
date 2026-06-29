import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export abstract class BaseEntity {
  _id!: Types.ObjectId;

  @Prop({
    default: null,
  })
  deleted_at?: Date;

  created_at!: Date;

  updated_at!: Date;
}