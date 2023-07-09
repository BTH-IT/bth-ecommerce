import {
  CreateNewProductDto,
  UpdateNewProductDto,
} from '../../dto/product.dto';
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repo';
import { Product } from '@/schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async createNewProduct(product: CreateNewProductDto): Promise<Product> {
    const newProduct = await this.productsRepository.create(product);
    return newProduct;
  }

  async updateNewProduct(
    product: UpdateNewProductDto,
  ): Promise<Product | null> {
    const newProduct = await this.productsRepository.findByIdAndUpdate(
      product._id,
      product,
    );
    return newProduct;
  }
}
