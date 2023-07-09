import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from './features.repo';
import { Feature } from '@/schemas/feature.schema';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';
import { CreateNewFeatureDto } from '@/dto/feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private readonly featuresRepository: FeaturesRepository) {}

  async findAll(): Promise<Feature[]> {
    return this.featuresRepository.findAll();
  }

  async findOne(id: string): Promise<Feature | null> {
    return this.featuresRepository.findById(id as string);
  }

  async findManyByCondition(featureList: RoleAndFeature[]): Promise<Feature[]> {
    const newFeatureList = featureList.map((f) => f.feature.toString());
    console.log(newFeatureList);
    console.log(
      await this.featuresRepository.getByCondition({
        _id: {
          $in: newFeatureList,
        },
      }),
    );
    return await this.featuresRepository.getByCondition({
      where: {
        id: {
          $in: ['64aa71fdf50200d13cd4585b'],
        },
      },
    });
  }

  async createNewFeature(feature: CreateNewFeatureDto): Promise<Feature> {
    const newFeature = await this.featuresRepository.create({
      ...feature,
      isActive: true,
    });
    return newFeature;
  }
}
