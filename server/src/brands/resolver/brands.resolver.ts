import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandsService } from '../services/brands.service';
import { Brand } from '@/schemas/brand.schema';
import {
  CreateNewBrandInput,
  DeleteBrandInput,
  ParamsBrandInput,
  UpdateBrandInput,
} from '@/input-types/brand.input';
import { UseGuards } from '@nestjs/common';
import { ReadBrandGuard } from '../guards/read-brand.guard';
import { CreateBrandGuard } from '../guards/create-brand.guard';
import { UpdateBrandGuard } from '../guards/update-brand.guard';
import { DeleteBrandGuard } from '../guards/delete-brand.guard';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private brandsService: BrandsService) {}

  @Query(() => [Brand])
  async getAllBrands(@Args('params') params: ParamsBrandInput) {
    return await this.brandsService.findAll(params);
  }

  @Query(() => Brand)
  @UseGuards(ReadBrandGuard)
  async getBrand(@Args('id') id: string) {
    return await this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  @UseGuards(CreateBrandGuard)
  async createNewBrand(@Args('createNewBrand') data: CreateNewBrandInput) {
    return this.brandsService.createNewBrand(data);
  }

  @Mutation(() => Brand)
  @UseGuards(UpdateBrandGuard)
  async updateBrand(@Args('updateBrand') data: UpdateBrandInput) {
    return this.brandsService.updateBrand(data);
  }

  @Mutation(() => Brand)
  @UseGuards(DeleteBrandGuard)
  async deleteBrand(@Args('deleteBrand') data: DeleteBrandInput) {
    return this.brandsService.deleteBrand(data);
  }
}
