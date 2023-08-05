import { ProductSchema } from '../schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
import { OrderDetailsService } from './services/order-details.service';
import { OrderDetailsRepository } from './repositories/order-details.repo';
import { OrdersResolver } from './resolvers/orders.resolver';
import { OrdersService } from './services/orders.service';
import { Order, OrderSchema } from '@/schemas/order.schema';
import { OrderDetail, OrderDetailSchema } from '@/schemas/order-detail.schema';
import { OrdersRepository } from './repositories/orders.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/services/roles.service';
import { RolesRepository } from '@/roles/repositories/roles.repo';
import { ProductDetailsService } from '@/products/services/productDetails.service';
import { Brand, BrandSchema } from '@/schemas/brand.schema';
import { BrandsRepository } from '@/brands/repositories/brands.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: User.name, schema: UserSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Brand.name, schema: BrandSchema },
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
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
    ProductDetailsService,
    ProductDetailsRepository,
    BrandsRepository,
  ],
})
export class OrdersModule {}
