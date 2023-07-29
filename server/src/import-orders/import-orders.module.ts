import { ImportOrdersResolver } from './resolvers/import-orders.resolver';
import { ProductSchema } from './../schemas/product.schema';
import { Module } from '@nestjs/common';
import { ImportOrdersService } from './services/import-orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportOrder, ImportOrderSchema } from '@/schemas/import-order.schema';
import { Supplier, SupplierSchema } from '@/schemas/supplier.schema';
import { Product } from '@/schemas/product.schema';
import { ImportOrdersRepository } from './repositories/import-orders.repo';
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
import { ImportOrderDetailsRepository } from './repositories/import-order-details.repo';
import { ImportOrderDetailsService } from './services/import-order-details.service';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repo';
import { User, UserSchema } from '@/schemas/user.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/roles.service';
import { RolesRepository } from '@/roles/roles.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { ProductDetailsService } from '@/products/services/productDetails.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImportOrder.name, schema: ImportOrderSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: ImportOrderDetail.name, schema: ImportOrderDetailSchema },
      { name: User.name, schema: UserSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [
    ImportOrdersResolver,
    ImportOrdersService,
    ImportOrdersRepository,
    ProductsService,
    ProductsRepository,
    ProductDetailsRepository,
    ProductDetailsService,
    SuppliersRepository,
    SuppliersService,
    ImportOrderDetailsRepository,
    ImportOrderDetailsService,
    UsersService,
    UsersRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
  ],
})
export class ImportOrdersModule {}
