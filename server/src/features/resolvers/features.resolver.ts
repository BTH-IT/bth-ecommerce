import { Feature } from '@/schemas/feature.schema';
import { FeaturesService } from '../services/features.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateNewFeatureInput,
  DeleteFeatureInput,
  ParamsFeatureInput,
  UpdateFeatureInput,
} from '@/input-types/feature.input';
import { UseGuards } from '@nestjs/common';
import { ReadFeatureGuard } from '../guards/read-feature.guard';
import { CreateFeatureGuard } from '../guards/create-feature.guard';
import { UpdateFeatureGuard } from '../guards/update-feature.guard';
import { DeleteFeatureGuard } from '../guards/delete-feature.guard';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => [Feature])
  @UseGuards(ReadFeatureGuard)
  getAllFeatures(@Args('params') params: ParamsFeatureInput) {
    return this.featuresService.findAll(params);
  }

  @Query(() => Feature)
  @UseGuards(ReadFeatureGuard)
  getFeature(@Args('id') id: string) {
    return this.featuresService.findOne(id);
  }

  @Mutation(() => Feature)
  @UseGuards(CreateFeatureGuard)
  async createNewFeature(
    @Args('createNewFeature') data: CreateNewFeatureInput,
  ) {
    return this.featuresService.createNewFeature(data);
  }

  @Mutation(() => Feature)
  @UseGuards(UpdateFeatureGuard)
  async updateFeature(@Args('updateFeature') data: UpdateFeatureInput) {
    return this.featuresService.updateFeature(data);
  }

  @Mutation(() => Feature)
  @UseGuards(DeleteFeatureGuard)
  async deleteFeature(@Args('deleteFeature') data: DeleteFeatureInput) {
    return this.featuresService.deleteFeature(data);
  }
}
