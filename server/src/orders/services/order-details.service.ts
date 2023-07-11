import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from '../repositories/order-details.repo';
import { OrderDetail } from '@/schemas/order-detail.schema';
import {
  CreateNewOrderDetailDto,
  DeleteOrderDetailDto,
  UpdateOrderDetailDto,
} from '@/dto/order-details.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly OrderDetailsRepository: OrderDetailsRepository,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.OrderDetailsRepository.findAll();
  }

  async findOne(id: string): Promise<OrderDetail | null> {
    return this.OrderDetailsRepository.findById(id);
  }

  async findManyByCondition(data: [OrderDetail]): Promise<OrderDetail[]> {
    const OrderDetailIdList = data.map((Order) => Order._id);

    return this.OrderDetailsRepository.getByCondition({
      where: {
        _id: {
          $in: OrderDetailIdList,
        },
      },
    });
  }

  async updateOrderDetail(
    data: UpdateOrderDetailDto,
  ): Promise<OrderDetail | null> {
    const { _id, ...orderDetail } = data;
    return this.OrderDetailsRepository.findByIdAndUpdate(_id, orderDetail);
  }

  async createNewOrderDetailDto(
    data: CreateNewOrderDetailDto,
  ): Promise<OrderDetail> {
    return this.OrderDetailsRepository.create(data);
  }

  async deleteOrderDetail(data: DeleteOrderDetailDto): Promise<any> {
    return this.OrderDetailsRepository.deleteOne(data._id);
  }
}
