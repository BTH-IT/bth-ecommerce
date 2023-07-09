import {
  Model,
  FilterQuery,
  QueryOptions,
  Document,
  UnpackedIntersection,
  IfAny,
  Require_id,
} from 'mongoose';

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: any): Promise<any> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions): Promise<T | null> {
    return this.model.findById(id, option);
  }

  async findByCondition(
    filter: any,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<UnpackedIntersection<
    IfAny<T, any, Document<unknown, object, T> & Omit<Require_id<T>, never>>,
    T
  > | null> {
    return this.model.findOne(filter, field, option).populate(populate);
  }

  async findManyByCondition(
    filter: any,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<
    UnpackedIntersection<
      IfAny<
        T[],
        any,
        Document<unknown, object, T[]> & Omit<Require_id<T[]>, never>
      >,
      T[]
    >
  > {
    return this.model.find(filter, field, option).populate(populate);
  }

  async getByCondition(
    filter: any,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<T[]> {
    return this.model.find(filter, field, option).populate(populate);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async aggregate(option: any) {
    return this.model.aggregate(option);
  }

  async populate(result: T[], option: any) {
    return await this.model.populate(result, option);
  }

  async deleteOne(id: string) {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteByCondition(filter: any) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter: any, update: any) {
    return this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter: any, update: any, option?: any | null) {
    return this.model.updateMany(filter, update, option);
  }

  async findByIdAndUpdate(id: any, update: any) {
    return this.model.findByIdAndUpdate(id, update);
  }
}
