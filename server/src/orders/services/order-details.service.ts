import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from '../repositories/order-details.repo';
import { OrderDetail } from '@/schemas/order-detail.schema';
import {
  CreateNewOrderDetailDto,
  DeleteOrderDetailDto,
  UpdateOrderDetailDto,
} from '@/dto/order-details.dto';
import { ObjectId } from '@/utils/contains';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.findAll();
  }

  async findOne(id: string): Promise<OrderDetail | null> {
    return this.orderDetailsRepository.findById(id);
  }

  async findManyByCondition(orderId: string): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.getByCondition({
      order: new ObjectId(orderId),
    });
  }

  async updateOrderDetail(
    data: UpdateOrderDetailDto,
  ): Promise<OrderDetail | null> {
    const { _id, ...orderDetail } = data;
    return this.orderDetailsRepository.findByIdAndUpdate(_id, orderDetail);
  }

  async createNewOrderDetail(
    data: CreateNewOrderDetailDto,
  ): Promise<OrderDetail> {
    return this.orderDetailsRepository.create(data);
  }

  async deleteOrderDetail(data: DeleteOrderDetailDto): Promise<any> {
    return this.orderDetailsRepository.deleteOne(data._id);
  }
}
