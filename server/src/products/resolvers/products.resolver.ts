import { UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Args } from '@nestjs/graphql';
import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { ReadProductGuard } from '../guards/read-product.guard';
import { UpdateProductGuard } from '../guards/update-product.guard';
import { CreateProductGuard } from '../guards/create-product.guard';
import { UpdateNewProductDto } from '@/dto/product.dto';
import { Product } from '@/schemas/product.schema';
import {
  CreateNewProductInput,
  UpdateNewProductInput,
} from '@/input-types/product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  @UseGuards(ReadProductGuard)
  getAllProducts() {
    return this.productsService.findAll();
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
  async updateNewProduct(
    @Args('updateNewProduct') data: UpdateNewProductInput,
  ) {
    return this.productsService.updateNewProduct(data);
  }
}
