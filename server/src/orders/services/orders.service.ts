import { Injectable } from '@nestjs/common';
import { Order } from '@/schemas/order.schema';
import {
  CreateNewOrderDto,
  DeleteOrderDto,
  UpdateOrderDto,
} from '@/dto/order.dto';
import { ObjectId } from '@/utils/constains';
import { OrdersRepository } from '../repositories/orders.repo';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.getByCondition({ isHidden: true });
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
