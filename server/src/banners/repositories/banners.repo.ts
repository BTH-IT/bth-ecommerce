import { BaseRepository } from '@/base.repository';
import { Banner } from '@/schemas/banner.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BannersRepository extends BaseRepository<Banner> {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<Banner>,
  ) {
    super(bannerModel);
  }
}
