import { CreateNewProductDto } from '../../../dto/product.dto';
import { Product } from '../../../interfaces/product.interface';
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repo';

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
}
