import { Feature } from '@/schemas/feature.schema';
import { FeaturesService } from './features.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNewFeatureInput } from '@/input-types/feature.input';

@Resolver()
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => [Feature])
  getAllFeatures() {
    return this.featuresService.findAll();
  }

  @Mutation(() => Feature)
  async createNewFeature(
    @Args('createNewFeature') data: CreateNewFeatureInput,
  ) {
    return this.featuresService.createNewFeature(data);
  }
}
