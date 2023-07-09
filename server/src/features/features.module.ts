import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturesRepository } from './features.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import { RoleAndFeatureRepository } from './role-and-feature.repo';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feature.name,
        schema: FeatureSchema,
      },
      {
        name: RoleAndFeature.name,
        schema: RoleAndFeatureSchema,
      },
    ]),
  ],
  providers: [
    FeaturesService,
    FeaturesResolver,
    FeaturesRepository,
    RoleAndFeatureRepository,
  ],
  exports: [FeaturesService],
})
export class FeaturesModule {}
