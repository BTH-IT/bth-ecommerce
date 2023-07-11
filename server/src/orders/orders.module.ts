import { ProductSchema } from '../schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportOrder, ImportOrderSchema } from '@/schemas/import-order.schema';
import { Supplier, SupplierSchema } from '@/schemas/supplier.schema';
import { Product } from '@/schemas/product.schema';
import { ProductsService } from '@/products/services/products.service';
import { ProductsRepository } from '@/products/repositories/products.repo';
import { ProductDetailsRepository } from '@/products/repositories/product-details.repo';
import {
  ProductDetail,
  ProductDetailSchema,
} from '@/schemas/product-detail.schema';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repo';
import { User, UserSchema } from '@/schemas/user.schema';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsRepository } from './order-details.repo';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repo';
import { Order, OrderSchema } from '@/schemas/order.schema';
import { OrderDetail, OrderDetailSchema } from '@/schemas/order-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    OrdersResolver,
    OrdersService,
    OrdersRepository,
    ProductsService,
    ProductsRepository,
    ProductDetailsRepository,
    OrderDetailsRepository,
    OrderDetailsService,
    UsersService,
    UsersRepository,
  ],
})
export class OrdersModule {}
