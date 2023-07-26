import { Injectable } from '@nestjs/common';
import { Order } from '@/schemas/order.schema';
import {
  CreateNewOrderDto,
  DeleteOrderDto,
  ParamsOrderDto,
  UpdateOrderDto,
} from '@/dto/order.dto';
import { ObjectId } from '@/utils/contains';
import { OrdersRepository } from '../repositories/orders.repo';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async findAll(params: ParamsOrderDto): Promise<Order[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = {};

    for (const key in params) {
      if (key === 'type' && parameters[key] !== null) {
        filter['status'] = parameters[key];
        continue;
      }

      if (key === 'userId' && parameters[key] !== null) {
        filter['user'] = new ObjectId(parameters[key]);
        continue;
      }

      if (key === 'dateRange' && parameters[key] !== null) {
        filter['createdAt'] = {
          $gte: parameters[key].from,
          $lt: parameters[key].to,
        };
        continue;
      }
      filter[key] = parameters[key];
    }

    return this.ordersRepository.getByCondition(filter);
  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findByCondition({
      _id: new ObjectId(id),
      isHidden: true,
    });
  }

  async updateOrder(data: UpdateOrderDto): Promise<Order | null> {
    const { _id, ...order } = data;
    return this.ordersRepository.findByIdAndUpdate(_id, order);
  }

  async createNewOrder(data: CreateNewOrderDto): Promise<Order> {
    return this.ordersRepository.create(data);
  }

  async deleteOrder(data: DeleteOrderDto): Promise<any> {
    return this.ordersRepository.deleteOne(data._id);
  }
}
