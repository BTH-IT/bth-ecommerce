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
  UpdateOrderInput,
} from '@/input-types/order.input';
import { UseGuards } from '@nestjs/common';
import { ReadOrderGuard } from '../guards/read-order.guard';
import { CreateOrderGuard } from '../guards/create-order.guard';
import { UpdateOrderGuard } from '../guards/update-order.guard';
import { DeleteOrderGuard } from '../guards/delete-order.guard';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Order])
  @UseGuards(ReadOrderGuard)
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @Query(() => Order)
  @UseGuards(ReadOrderGuard)
  getOrder(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(CreateOrderGuard)
  async createNewOrder(@Args('createNewOrder') data: CreateNewOrderInput) {
    return this.ordersService.createNewOrder(data);
  }

  @Mutation(() => Order)
  @UseGuards(UpdateOrderGuard)
  async updateOrder(@Args('updateOrder') data: UpdateOrderInput) {
    return this.ordersService.updateOrder(data);
  }

  @Mutation(() => Order)
  @UseGuards(DeleteOrderGuard)
  async deleteOrder(@Args('deleteOrder') data: DeleteOrderInput) {
    return this.ordersService.deleteOrder(data);
  }

  @ResolveField('boughtProducts', () => [OrderDetail])
  async getedProducts(@Parent() order: Order) {
    return await this.orderDetailsService.findManyByCondition(
      order.boughtProducts,
    );
  }

  @ResolveField('user', () => User)
  async getSupplier(@Parent() order: Order) {
    return await this.usersService.findOne(order.user._id.toString());
  }

  @ResolveField('employee', () => User)
  async getRoleAndFeature(@Parent() Order: Order) {
    return await this.usersService.findOne(Order.employee._id.toString());
  }
}
