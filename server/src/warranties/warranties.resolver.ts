import { Warranty } from '@/schemas/warranty.schema';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { WarrantiesService } from './warranties.service';
import {
  CreateNewWarrantyInput,
  DeleteWarrantyInput,
  UpdateWarrantyInput,
} from '@/input-types/warranty.input';
import { Product } from '@/schemas/product.schema';
import { ProductsService } from '@/products/services/products.service';
import { UseGuards } from '@nestjs/common';
import { ReadWarrantyGuard } from './guards/read-warranty.guard';
import { CreateWarrantyGuard } from './guards/create-warranty.guard';
import { UpdateWarrantyGuard } from './guards/update-warranty.guard';
import { DeleteWarrantyGuard } from './guards/delete-warranty.guard';

@Resolver(() => Warranty)
export class WarrantiesResolver {
  constructor(
    private warrantiesService: WarrantiesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Warranty])
  @UseGuards(ReadWarrantyGuard)
  async getAllWarranties() {
    return await this.warrantiesService.findAll();
  }

  @Query(() => Warranty)
  @UseGuards(ReadWarrantyGuard)
  async getWarranty(@Args('id') id: string) {
    return await this.warrantiesService.findOne(id);
  }

  @Mutation(() => Warranty)
  @UseGuards(CreateWarrantyGuard)
  async createNewWarranty(
    @Args('createNewWarranty') data: CreateNewWarrantyInput,
  ) {
    return this.warrantiesService.createNewWarranty(data);
  }

  @Mutation(() => Warranty)
  @UseGuards(UpdateWarrantyGuard)
  async updateWarranty(@Args('updateWarranty') data: UpdateWarrantyInput) {
    return this.warrantiesService.updateWarranty(data);
  }

  @Mutation(() => Warranty)
  @UseGuards(DeleteWarrantyGuard)
  async deleteWarranty(@Args('deleteWarranty') data: DeleteWarrantyInput) {
    return this.warrantiesService.deleteWarranty(data);
  }

  @ResolveField('product', () => Product)
  async getAccount(@Parent() warranty: Warranty) {
    return this.productsService.findOne(warranty.product._id.toString());
  }
}
