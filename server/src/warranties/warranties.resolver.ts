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

@Resolver(() => Warranty)
export class WarrantiesResolver {
  constructor(
    private warrantiesService: WarrantiesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Warranty])
  async getAllWarranties() {
    return await this.warrantiesService.findAll();
  }

  @Query(() => Warranty)
  async getWarranty(@Args('id') id: string) {
    return await this.warrantiesService.findOne(id);
  }

  @Mutation(() => Warranty)
  async createNewWarranty(
    @Args('createNewWarranty') data: CreateNewWarrantyInput,
  ) {
    return this.warrantiesService.createNewWarranty(data);
  }

  @Mutation(() => Warranty)
  async updateWarranty(@Args('updateWarranty') data: UpdateWarrantyInput) {
    return this.warrantiesService.updateWarranty(data);
  }

  @Mutation(() => Warranty)
  async deleteWarranty(@Args('deleteWarranty') data: DeleteWarrantyInput) {
    return this.warrantiesService.deleteWarranty(data);
  }

  @ResolveField('product', () => Product)
  async getAccount(@Parent() warranty: Warranty) {
    return this.productsService.findOne(warranty.product._id.toString());
  }
}
