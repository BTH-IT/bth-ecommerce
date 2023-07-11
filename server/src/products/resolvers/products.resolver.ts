import { UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Args, Parent, ResolveField } from '@nestjs/graphql';
import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { ReadProductGuard } from '../guards/read-product.guard';
import { UpdateProductGuard } from '../guards/update-product.guard';
import { CreateProductGuard } from '../guards/create-product.guard';
import { Product } from '@/schemas/product.schema';
import {
  CreateNewProductInput,
  DeleteProductInput,
  UpdateProductInput,
} from '@/input-types/product.input';
import { DeleteProductGuard } from '../guards/delete-product.guard';
import { Brand } from '@/schemas/brand.schema';
import { BrandsService } from '@/brands/services/brands.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
  ) {}

  @Query(() => [Product])
  @UseGuards(ReadProductGuard)
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  getProduct(@Args('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  @UseGuards(CreateProductGuard)
  async createNewProduct(
    @Args('createNewProduct') data: CreateNewProductInput,
  ) {
    return this.productsService.createNewProduct(data);
  }

  @Mutation(() => Product)
  @UseGuards(UpdateProductGuard)
  async updateProduct(@Args('updateProduct') data: UpdateProductInput) {
    return this.productsService.updateProduct(data);
  }

  @Mutation(() => Product)
  @UseGuards(DeleteProductGuard)
  async deleteProduct(@Args('deleteProduct') data: DeleteProductInput) {
    return this.productsService.deleteProduct(data);
  }

  @ResolveField('brand', () => Brand)
  async getBrand(@Parent() product: Product) {
    return this.brandsService.findOne(product.brand._id.toString());
  }
}
