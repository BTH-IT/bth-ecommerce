import { Feature } from '@/schemas/feature.schema';
import { FeaturesService } from './features.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateNewFeatureInput,
  DeleteFeatureInput,
  UpdateFeatureInput,
} from '@/input-types/feature.input';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => [Feature])
  getAllFeatures() {
    return this.featuresService.findAll();
  }

  @Query(() => Feature)
  getFeature(@Args('id') id: string) {
    return this.featuresService.findOne(id);
  }

  @Mutation(() => Feature)
  async createNewFeature(
    @Args('createNewFeature') data: CreateNewFeatureInput,
  ) {
    return this.featuresService.createNewFeature(data);
  }

  @Mutation(() => Feature)
  async updateFeature(@Args('updateFeature') data: UpdateFeatureInput) {
    return this.featuresService.updateFeature(data);
  }

  @Mutation(() => Feature)
  async deleteFeature(@Args('deleteFeature') data: DeleteFeatureInput) {
    return this.featuresService.deleteFeature(data);
  }
}
