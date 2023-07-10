import { BaseRepository } from '@/base.repository';
import { Brand } from '@/schemas/brand.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsRepository extends BaseRepository<Brand> {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>,
  ) {
    super(brandModel);
  }
}
