import { BaseRepository } from '@/base.repository';
import { ImportOrder } from '@/schemas/import-order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ImportOrdersRepository extends BaseRepository<ImportOrder> {
  constructor(
    @InjectModel(ImportOrder.name)
    private readonly importOrderModel: Model<ImportOrder>,
  ) {
    super(importOrderModel);
  }
}
