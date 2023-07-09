import { BaseRepository } from '@/base.repository';
import { Feature } from '@/schemas/feature.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeaturesRepository extends BaseRepository<Feature> {
  constructor(
    @InjectModel(Feature.name)
    private readonly featureModel: Model<Feature>,
  ) {
    super(featureModel);
  }
}
