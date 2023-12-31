import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { Order } from '@/schemas/order.schema';
import { OrdersService } from '../services/orders.service';
import { OrderDetailsService } from '../services/order-details.service';
import { OrderDetail } from '@/schemas/order-detail.schema';
import {
  CreateNewOrderInput,
  DeleteOrderInput,
  ParamsOrderInput,
  UpdateOrderInput,
} from '@/input-types/order.input';
import { UseGuards } from '@nestjs/common';
import { ReadOrderGuard } from '../guards/read-order.guard';
import { CreateOrderGuard } from '../guards/create-order.guard';
import { UpdateOrderGuard } from '../guards/update-order.guard';
import { DeleteOrderGuard } from '../guards/delete-order.guard';
import { ProductDetailsService } from '@/products/services/productDetails.service';
import { WarrantiesService } from '@/warranties/warranties.service';
import { ProductsService } from '@/products/services/products.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly usersService: UsersService,
    private readonly warrantiesService: WarrantiesService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Order])
  @UseGuards(ReadOrderGuard)
  getAllOrders(@Args('params') params: ParamsOrderInput) {
    return this.ordersService.findAll(params);
  }

  @Query(() => Order)
  @UseGuards(ReadOrderGuard)
  getOrder(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(CreateOrderGuard)
  async createNewOrder(@Args('createNewOrder') data: CreateNewOrderInput) {
    const { boughtProducts, ...order } = data;

    const newBoughtProducts = boughtProducts.map((cart) => cart.product);
    const totalPay = boughtProducts.reduce((p, c) => p + c.amount * c.price, 0);

    const user = await this.usersService.findOne(order.user);

    const newOrder = {
      ...order,
      boughtProducts: newBoughtProducts,
      status: 'waiting',
      fullname: user?.fullname || '',
      phone: user?.phone || '',
      address: user?.address || '',
      isPaid: false,
      totalPay,
    };

    const orderDoc = await this.ordersService.createNewOrder(newOrder);

    await Promise.all(
      boughtProducts.map(async (p) => {
        for (let i = 1; i <= p.amount; i++) {
          const productDetail =
            await this.productDetailsService.deleteProductDetail({
              _id: p.product,
            });

          if (!productDetail) return p;

          const data = {
            price: p.price,
            productDetail: productDetail._id.toString(),
            product: p.product,
          };

          await this.orderDetailsService.createNewOrderDetail({
            ...data,
            order: orderDoc._id.toString(),
          });

          return p;
        }
      }),
    );

    return orderDoc;
  }

  @Mutation(() => Order)
  @UseGuards(UpdateOrderGuard)
  async updateOrder(@Args('updateOrder') data: UpdateOrderInput) {
    const order = await this.getOrder(data._id);
    if (data.status?.toLowerCase() === 'done' && order?.status !== 'done') {
      const boughtProducts = await this.orderDetailsService.findManyByCondition(
        data._id,
        false,
      );

      await Promise.all(
        boughtProducts.map(async (orderDetail) => {
          await this.warrantiesService.createNewWarranty({
            warrantyYear: orderDetail.product.warranteeYear,
            productDetail: orderDetail.productDetail,
            user: data.user,
            product: orderDetail.product._id.toString(),
          });

          await this.productsService.updateProduct({
            _id: orderDetail.product._id.toString(),
            soldNum: orderDetail.product.soldNum + orderDetail.amount,
          });
        }),
      );
    } else if (
      data.status?.toLowerCase() === 'canceled' &&
      order?.status !== 'canceled'
    ) {
      const boughtProducts = await this.orderDetailsService.findManyByCondition(
        data._id,
        false,
      );

      await Promise.all(
        boughtProducts.map(async (orderDetail) => {
          await this.productDetailsService.createNewProductDetail({
            product: orderDetail.product._id.toString(),
          });
        }),
      );
    }

    return this.ordersService.updateOrder(data);
  }

  @Mutation(() => Order)
  @UseGuards(DeleteOrderGuard)
  async deleteOrder(@Args('deleteOrder') data: DeleteOrderInput) {
    return this.ordersService.deleteOrder(data);
  }

  @ResolveField('boughtProducts', () => [OrderDetail])
  async getProducts(@Parent() order: Order) {
    return await this.orderDetailsService.findManyByCondition(
      order._id.toString(),
    );
  }

  @ResolveField('user', () => User)
  async getSupplier(@Parent() order: Order) {
    return await this.usersService.findOne(order.user._id.toString());
  }

  @ResolveField('employee', () => User)
  async getRoleAndFeature(@Parent() order: Order) {
    if (!order.employee) {
      return {
        _id: '',
      };
    }
    return await this.usersService.findOne(order.employee._id.toString());
  }
}
