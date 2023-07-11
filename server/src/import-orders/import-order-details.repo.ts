import { BaseRepository } from '@/base.repository';
import { ImportOrderDetail } from '@/schemas/import-order-detail.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImportOrderDetailsRepository extends BaseRepository<ImportOrderDetail> {
  constructor(
    @InjectModel(ImportOrderDetail.name)
    private readonly importOrderDetailModel: Model<ImportOrderDetail>,
  ) {
    super(importOrderDetailModel);
  }
}
