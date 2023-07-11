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
import { OrdersService } from './orders.service';
import { OrderDetailsService } from './order-details.service';
import { OrderDetail } from '@/schemas/order-detail.schema';
import {
  CreateNewOrderInput,
  DeleteOrderInput,
  UpdateOrderInput,
} from '@/input-types/order.input';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [Order])
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @Query(() => Order)
  getOrder(@Args('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  async createNewOrder(@Args('createNewOrder') data: CreateNewOrderInput) {
    return this.ordersService.createNewOrder(data);
  }

  @Mutation(() => Order)
  async updateOrder(@Args('updateOrder') data: UpdateOrderInput) {
    return this.ordersService.updateOrder(data);
  }

  @Mutation(() => Order)
  async deleteOrder(@Args('deleteOrder') data: DeleteOrderInput) {
    return this.ordersService.deleteOrder(data);
  }

  @ResolveField('edProducts', () => [OrderDetail])
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
