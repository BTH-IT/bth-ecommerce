import { Injectable } from '@nestjs/common';
import { TypesRepository } from './types.repo';
import { Type } from '@/schemas/type.schema';
import { ObjectId } from '@/utils/contains';
import {
  CreateNewTypeDto,
  DeleteTypeDto,
  ParamsTypeDto,
  UpdateTypeDto,
} from '@/dto/type.dto';

@Injectable()
export class TypesService {
  constructor(private readonly typesRepository: TypesRepository) {}

  async findOne(id: string): Promise<Type | null> {
    return this.typesRepository.findByCondition({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  async findAll(params: ParamsTypeDto): Promise<Type[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = {
      isActive: true,
    };

    for (const key in params) {
      if (key === 'search' && parameters[key] !== null) {
        const search = parameters[key];
        const re = new RegExp(`${search}`, 'i');
        filter['name'] = re;
        continue;
      }

      filter[key] = parameters[key];
    }

    return this.typesRepository.getByCondition(filter);
  }

  async createNewType(type: CreateNewTypeDto): Promise<Type> {
    return this.typesRepository.create(type);
  }

  async updateType(data: UpdateTypeDto): Promise<Type | null> {
    const { _id, ...type } = data;
    return this.typesRepository.findByIdAndUpdate(_id, type);
  }

  async deleteType(type: DeleteTypeDto): Promise<Type | null> {
    return this.typesRepository.findByConditionAndUpdate(type._id, {
      isActive: false,
    });
  }
}
