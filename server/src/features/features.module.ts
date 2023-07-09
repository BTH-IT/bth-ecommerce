import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesResolver } from './features.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturesRepository } from './features.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feature.name,
        schema: FeatureSchema,
      },
    ]),
  ],
  providers: [FeaturesService, FeaturesResolver, FeaturesRepository],
  exports: [FeaturesService],
})
export class FeaturesModule {}
