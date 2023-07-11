import { BaseRepository } from '@/base.repository';
import { OrderDetail } from '@/schemas/order-detail.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderDetailsRepository extends BaseRepository<OrderDetail> {
  constructor(
    @InjectModel(OrderDetail.name)
    private readonly orderDetailModel: Model<OrderDetail>,
  ) {
    super(orderDetailModel);
  }
}
