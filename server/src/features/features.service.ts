import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from './features.repo';
import { Feature } from '@/schemas/feature.schema';
import {
  CreateNewFeatureDto,
  DeleteFeatureDto,
  UpdateFeatureDto,
} from '@/dto/feature.dto';
import { RoleAndFeatureRepository } from './role-and-feature.repo';

@Injectable()
export class FeaturesService {
  constructor(
    private readonly featuresRepository: FeaturesRepository,
    private readonly roleAndFeatureRepository: RoleAndFeatureRepository,
  ) {}

  async findAll(): Promise<Feature[]> {
    return this.featuresRepository.getByCondition({ isActive: true });
  }

  async findOne(id: string): Promise<Feature | null> {
    return this.featuresRepository.findByCondition({ _id: id, isActive: true });
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
      { feature: feature._id },
      {
        isActive: false,
      },
    );

    return this.featuresRepository.findByIdAndUpdate(feature._id, {
      isActive: false,
    });
  }
}
