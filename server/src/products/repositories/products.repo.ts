import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Product } from '@/schemas/product.schema';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
}
