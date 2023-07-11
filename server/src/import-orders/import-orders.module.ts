import { ImportOrdersResolver } from './import-orders.resolver';
import { ProductSchema } from './../schemas/product.schema';
import { Module } from '@nestjs/common';
import { ImportOrdersService } from './import-orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportOrder, ImportOrderSchema } from '@/schemas/import-order.schema';
import { Supplier, SupplierSchema } from '@/schemas/supplier.schema';
import { Product } from '@/schemas/product.schema';
import { ImportOrdersRepository } from './import-orders.repo';
import { ProductsService } from '@/products/services/products.service';
import { SuppliersService } from '@/suppliers/suppliers.service';
import { ProductsRepository } from '@/products/repositories/products.repo';
import { SuppliersRepository } from '@/suppliers/suppliers.repo';
import { ProductDetailsRepository } from '@/products/repositories/product-details.repo';
import {
  ProductDetail,
  ProductDetailSchema,
} from '@/schemas/product-detail.schema';
import {
  ImportOrderDetail,
  ImportOrderDetailSchema,
} from '@/schemas/import-order-detail.schema';
import { ImportOrderDetailsRepository } from './import-order-details.repo';
import { ImportOrderDetailsService } from './import-order-details.service';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repo';
import { User, UserSchema } from '@/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImportOrder.name, schema: ImportOrderSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: ImportOrderDetail.name, schema: ImportOrderDetailSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    ImportOrdersResolver,
    ImportOrdersService,
    ImportOrdersRepository,
    ProductsService,
    ProductsRepository,
    ProductDetailsRepository,
    SuppliersRepository,
    SuppliersService,
    ImportOrderDetailsRepository,
    ImportOrderDetailsService,
    UsersService,
    UsersRepository,
  ],
})
export class ImportOrdersModule {}
