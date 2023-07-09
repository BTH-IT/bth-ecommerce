import { Injectable } from '@nestjs/common';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';
import { RoleAndFeatureRepository } from './role-and-feature.repo';
import { FeaturesRepository } from './features.repo';
import { Feature } from '@/schemas/feature.schema';

@Injectable()
export class RoleAndFeatureService {
  constructor(
    private readonly roleAndFeatureRepository: RoleAndFeatureRepository,
    private readonly featuresRepository: FeaturesRepository,
  ) {}

  async findAll(): Promise<RoleAndFeature[]> {
    return this.roleAndFeatureRepository.findAll();
  }

  async findOne(id: string): Promise<RoleAndFeature | null> {
    return this.roleAndFeatureRepository.findByCondition({ id });
  }

  async findManyByCondition(_id: string): Promise<RoleAndFeature[]> {
    const raf = await this.roleAndFeatureRepository.findManyByCondition({
      role: _id,
    });

    const newFeatureList = raf.map((f) => f.feature.toString());

    const features = await this.featuresRepository.findManyByCondition({
      _id: {
        $in: newFeatureList,
      },
    });

    const newRaf = raf.map((r) => {
      r.feature = features.find(
        (f) => f._id.toString() === r.feature.toString(),
      ) as Feature;
      return r;
    });

    return newRaf;
  }
}
