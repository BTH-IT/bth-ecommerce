import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { Warranty } from '@/schemas/warranty.schema';

@Injectable()
export class WarrantiesRepository extends BaseRepository<Warranty> {
  constructor(
    @InjectModel(Warranty.name)
    private readonly warrantyModel: Model<Warranty>,
  ) {
    super(warrantyModel);
  }
}
