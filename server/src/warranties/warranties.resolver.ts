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
  ParamsWarrantyInput,
  UpdateWarrantyInput,
} from '@/input-types/warranty.input';
import { Product } from '@/schemas/product.schema';
import { ProductsService } from '@/products/services/products.service';
import { UseGuards } from '@nestjs/common';
import { ReadWarrantyGuard } from './guards/read-warranty.guard';
import { CreateWarrantyGuard } from './guards/create-warranty.guard';
import { UpdateWarrantyGuard } from './guards/update-warranty.guard';
import { DeleteWarrantyGuard } from './guards/delete-warranty.guard';
import { User } from '@/schemas/user.schema';
import { UsersService } from '@/users/users.service';

@Resolver(() => Warranty)
export class WarrantiesResolver {
  constructor(
    private warrantiesService: WarrantiesService,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Warranty])
  @UseGuards(ReadWarrantyGuard)
  async getAllWarranties(@Args('params') params: ParamsWarrantyInput) {
    return await this.warrantiesService.findAll(params);
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
  async getProduct(@Parent() warranty: Warranty) {
    return this.productsService.findOne(warranty.product.toString());
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() warranty: Warranty) {
    return this.usersService.findOne(warranty.user.toString());
  }
}
