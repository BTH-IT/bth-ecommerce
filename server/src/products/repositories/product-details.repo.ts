import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { ProductDetail } from '@/schemas/product-detail.schema';

@Injectable()
export class ProductDetailsRepository extends BaseRepository<ProductDetail> {
  constructor(
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetail>,
  ) {
    super(productDetailModel);
  }
}
