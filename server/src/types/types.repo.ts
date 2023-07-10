import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { Type } from '@/schemas/type.schema';

@Injectable()
export class TypesRepository extends BaseRepository<Type> {
  constructor(
    @InjectModel(Type.name)
    private readonly typeModel: Model<Type>,
  ) {
    super(typeModel);
  }
}
