import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BannersService } from '../services/banners.service';
import { Banner } from '@/schemas/banner.schema';
import { UseGuards } from '@nestjs/common';
import { ReadBannerGuard } from '../guards/read-banner.guard';
import { CreateBannerGuard } from '../guards/create-banner.guard';
import {
  CreateNewBannerInput,
  DeleteBannerInput,
  ParamsBannerInput,
  UpdateBannerInput,
} from '@/input-types/banner.input';
import { UpdateBannerGuard } from '../guards/update-banner.guard';
import { DeleteBannerGuard } from '../guards/delete-banner.guard';

@Resolver()
export class BannersResolver {
  constructor(private bannersService: BannersService) {}

  @Query(() => [Banner])
  async getAllBanners(@Args('params') params: ParamsBannerInput) {
    return await this.bannersService.findAll(params);
  }

  @Query(() => Banner)
  @UseGuards(ReadBannerGuard)
  async getBanner(@Args('id') id: string) {
    return await this.bannersService.findOne(id);
  }

  @Mutation(() => Banner)
  @UseGuards(CreateBannerGuard)
  async createNewBanner(@Args('createNewBanner') data: CreateNewBannerInput) {
    return this.bannersService.createNewBanner(data);
  }

  @Mutation(() => Banner)
  @UseGuards(UpdateBannerGuard)
  async updateBanner(@Args('updateBanner') data: UpdateBannerInput) {
    return this.bannersService.updateBanner(data);
  }

  @Mutation(() => Banner)
  @UseGuards(DeleteBannerGuard)
  async deleteBanner(@Args('deleteBanner') data: DeleteBannerInput) {
    return this.bannersService.deleteBanner(data);
  }
}
