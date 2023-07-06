import { ProductsService } from './../services/products.service';
import {Args} from "@nestjs/graphql";
import {Resolver, Mutation, Query} from "@nestjs/graphql"
import { CreateNewProductInput } from 'src/input-types/product.input-type';
import { ProductModel } from 'src/models/product.model';

@Resolver(of => ProductModel)
export class ProductsResolver {
  constructor(
    private productsService: ProductsService,
  ) {}

  @Query(returns => [ProductModel])
  getAll() {
    return this.productsService.findAll();
  }

  @Mutation(returns => ProductModel)
  async createNewProduct(@Args('createNewProduct') data: CreateNewProductInput ) {
    return this.productsService.createNewProduct(data);
  }
}