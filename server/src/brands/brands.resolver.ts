import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from '@/schemas/brand.schema';
import {
  CreateNewBrandInput,
  DeleteBrandInput,
  UpdateBrandInput,
} from '@/input-types/brand.input';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private brandsService: BrandsService) {}

  @Query(() => [Brand])
  async getAllBrands() {
    return await this.brandsService.findAll();
  }

  @Query(() => Brand)
  async getBrand(@Args('id') id: string) {
    return await this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  async createNewBrand(@Args('createNewBrand') data: CreateNewBrandInput) {
    return this.brandsService.createNewBrand(data);
  }

  @Mutation(() => Brand)
  async updateBrand(@Args('updateBrand') data: UpdateBrandInput) {
    return this.brandsService.updateBrand(data);
  }

  @Mutation(() => Brand)
  async deleteBrand(@Args('deleteBrand') data: DeleteBrandInput) {
    return this.brandsService.deleteBrand(data);
  }
}
