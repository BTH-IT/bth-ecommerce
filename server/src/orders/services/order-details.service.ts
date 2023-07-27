import { Injectable } from '@nestjs/common';
import { OrderDetailsRepository } from '../repositories/order-details.repo';
import { OrderDetail } from '@/schemas/order-detail.schema';
import {
  CreateNewOrderDetailDto,
  DeleteOrderDetailDto,
  UpdateOrderDetailDto,
} from '@/dto/order-details.dto';
import { ObjectId } from '@/utils/contains';
import { ProductsRepository } from '@/products/repositories/products.repo';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailsRepository.findAll();
  }

  async findOne(id: string): Promise<OrderDetail | null> {
    return this.orderDetailsRepository.findById(id);
  }

  async findManyByCondition(orderId: string): Promise<OrderDetail[]> {
    const list = await this.orderDetailsRepository.aggregate([
      {
        $match: {
          order: {
            $eq: new ObjectId(orderId),
          },
        },
      },
      {
        $lookup: {
          from: 'orderdetails',
          localField: 'product',
          foreignField: 'product',
          as: 'remainList',
        },
      },
      {
        $project: {
          _id: 1,
          product: 1,
          productDetail: 1,
          price: 1,
          order: 1,
          amount: {
            $size: '$remainList',
          },
        },
      },
    ]);

    const productList = await this.productsRepository.findAll();

    const newList: any[] = [];

    list.forEach(async (order) => {
      const product = productList.find(
        (p) => p._id.toString() === order.product.toString(),
      );

      const newOrder = {
        ...order,
        product,
      };

      if (newOrder.amount === 1 || newList.length <= 0) {
        newList.push(newOrder);
        return;
      }

      const isHad = Boolean(
        newList.find((ord) => {
          return ord.product._id.toString() === newOrder.product._id.toString();
        }),
      );

      if (!isHad) {
        newList.push(newOrder);
        return;
      }
    });

    return newList;
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
