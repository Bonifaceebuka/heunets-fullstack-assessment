import {
  Document,
  HydratedDocument,
  Model,
  UpdateQuery,
} from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  async findOne(
    conditions: Model<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOne({
      ...conditions,
      deletedAt: null,
    });
  }

  async findMany(
    conditions: Model<T>,
    orderBy = 'createdAt',
    direction: 'asc' | 'desc' = 'desc',
  ): Promise<T[]> {
    return this.model
      .find({
        ...conditions,
        deletedAt: null,
      })
      .sort({
        [orderBy]: direction,
      });
  }

  async updateOne(
    where: Model<T>,
    updates: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(where, updates, {
      new: true,
    });
  }

  async delete(
    conditions: Model<T>,
  ): Promise<void> {
    await this.model.deleteMany(conditions);
  }

  async findManyAndRelations(
    filter: Model<T>,
    populate: string[] = [],
  ): Promise<T[]> {
    let query = this.model.find({
      ...filter,
      deletedAt: null,
    });

    populate.forEach((field) => {
      query = query.populate(field);
    });

    return query.exec();
  }

  async findOneAndRelations(
    filter: Model<T>,
    populate: string[] = [],
  ): Promise<T | null> {
    let query = this.model.findOne({
      ...filter,
      deletedAt: null,
    });

    populate.forEach((field) => {
      query = query.populate(field);
    });

    return query.exec();
  }
}