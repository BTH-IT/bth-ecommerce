import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { Product, ProductSchema } from '../schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from './repositories/products.repo';
import { ProductsResolver } from './resolvers/products.resolver';
import { RolesModule } from '@/roles/roles.module';
import {
  ProductDetail,
  ProductDetailSchema,
} from '@/schemas/product-detail.schema';
import { ProductDetailsRepository } from './repositories/product-details.repo';
import { BrandsModule } from '@/brands/brands.module';
import { RoleAndFeatureService } from '@/features/services/role-and-feature.service';
import { RoleAndFeatureRepository } from '@/features/repositories/role-and-feature.repo';
import { FeaturesRepository } from '@/features/repositories/features.repo';
import {
  RoleAndFeature,
  RoleAndFeatureSchema,
} from '@/schemas/role-and-feature.schema';
import { Feature, FeatureSchema } from '@/schemas/feature.schema';
import { Brand, BrandSchema } from '@/schemas/brand.schema';
import { BrandsRepository } from '@/brands/repositories/brands.repo';

@Module({
  imports: [
    BrandsModule,
    RolesModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: RoleAndFeature.name, schema: RoleAndFeatureSchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductsResolver,
    ProductDetailsRepository,
    RoleAndFeatureService,
    RoleAndFeatureRepository,
    FeaturesRepository,
    BrandsRepository,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
