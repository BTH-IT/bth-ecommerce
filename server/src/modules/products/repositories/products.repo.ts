import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../base.repository';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel('products')
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
}