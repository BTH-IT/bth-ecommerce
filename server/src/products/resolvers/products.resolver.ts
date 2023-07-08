import { UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {Args} from "@nestjs/graphql";
import {Resolver, Mutation, Query} from "@nestjs/graphql"
import { CreateNewProductInput, UpdateNewProductInput } from 'src/input-types/product.input-type';
import { ProductModel } from 'src/models/product.model';
import { ReadProductGuard } from '../guards/read-product.guard';
import { UpdateProductGuard } from '../guards/update-product.guard';
import { CreateProductGuard } from '../guards/create-product.guard';

@Resolver(of => ProductModel)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
  ) {}

  @Query(returns => [ProductModel])
  @UseGuards(ReadProductGuard)
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Mutation(returns => ProductModel)
  @UseGuards(CreateProductGuard)
  async createNewProduct(@Args('createNewProduct') data: CreateNewProductInput ) {
    return this.productsService.createNewProduct(data);
  }

  @Mutation(returns => ProductModel)
  @UseGuards(UpdateProductGuard)
  async updateNewProduct(@Args('updateNewProduct') data: UpdateNewProductInput ) {
    return this.productsService.updateNewProduct(data);
  }
}