import { BaseRepository } from '@/base.repository';
import { Order } from '@/schemas/order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends BaseRepository<Order> {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {
    super(orderModel);
  }
}
