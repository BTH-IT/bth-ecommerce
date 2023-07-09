import { BaseRepository } from '@/base.repository';
import { RoleAndFeature } from '@/schemas/role-and-feature.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleAndFeatureRepository extends BaseRepository<RoleAndFeature> {
  constructor(
    @InjectModel(RoleAndFeature.name)
    private readonly roleAndFeatureModel: Model<RoleAndFeature>,
  ) {
    super(roleAndFeatureModel);
  }
}
