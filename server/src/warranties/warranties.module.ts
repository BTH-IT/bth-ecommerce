import { Module } from '@nestjs/common';
import { WarrantiesService } from './warranties.service';
import { WarrantiesResolver } from './warranties.resolver';
import { WarrantiesRepository } from './warranties.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Warranty, WarrantySchema } from '@/schemas/warranty.schema';
import {
  ProductDetail,
  ProductDetailSchema,
} from '@/schemas/product-detail.schema';
import { ProductDetailsRepository } from '@/products/repositories/product-details.repo';
import { ProductsService } from '@/products/services/products.service';
import { Product, ProductSchema } from '@/schemas/product.schema';
import { ProductsRepository } from '@/products/repositories/products.repo';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Role, RoleSchema } from '@/schemas/role.schema';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import { RolesService } from '@/roles/services/roles.service';
import { RolesRepository } from '@/roles/repositories/roles.repo';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { User, UserSchema } from '@/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/users.repo';
import { Brand, BrandSchema } from '@/schemas/brand.schema';
import { BrandsRepository } from '@/brands/repositories/brands.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warranty.name, schema: WarrantySchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  providers: [
    WarrantiesService,
    WarrantiesResolver,
    WarrantiesRepository,
    ProductDetailsRepository,
    ProductsService,
    ProductsRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    RolesService,
    RolesRepository,
    UsersService,
    UsersRepository,
    BrandsRepository,
  ],
})
export class WarrantiesModule {}
