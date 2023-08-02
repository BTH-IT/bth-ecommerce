import { Injectable } from '@nestjs/common';
import { Feature } from '@/schemas/feature.schema';
import {
  CreateNewFeatureDto,
  DeleteFeatureDto,
  ParamsFeatureDto,
  UpdateFeatureDto,
} from '@/dto/feature.dto';
import { ObjectId } from '@/utils/contains';
import { RoleAndFeatureRepository } from '../repositories/role-and-feature.repo';
import { FeaturesRepository } from '../repositories/features.repo';

@Injectable()
export class FeaturesService {
  constructor(
    private readonly featuresRepository: FeaturesRepository,
    private readonly roleAndFeatureRepository: RoleAndFeatureRepository,
  ) {}

  async findAll(params: ParamsFeatureDto): Promise<Feature[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = { isActive: true };

    for (const key in params) {
      if (key === 'search' && parameters[key] !== null) {
        const search = parameters[key];
        const re = new RegExp(`${search}`, 'i');
        filter['name'] = re;
        continue;
      }

      filter[key] = parameters[key];
    }
    return this.featuresRepository.getByCondition(filter);
  }

  async findOne(id: string): Promise<Feature | null> {
    return this.featuresRepository.findByCondition({
      _id: new ObjectId(id),
      isActive: true,
    });
  }

  async updateFeature(feature: UpdateFeatureDto): Promise<Feature | null> {
    return this.featuresRepository.findByIdAndUpdate(feature._id, {
      name: feature.name,
    });
  }

  async createNewFeature(feature: CreateNewFeatureDto): Promise<Feature> {
    return this.featuresRepository.create({
      ...feature,
      isActive: true,
    });
  }

  async deleteFeature(feature: DeleteFeatureDto): Promise<Feature | null> {
    await this.roleAndFeatureRepository.findByConditionAndUpdate(
      { feature: new ObjectId(feature._id) },
      {
        isActive: false,
      },
    );

    return this.featuresRepository.findByIdAndUpdate(feature._id, {
      isActive: false,
    });
  }
}
