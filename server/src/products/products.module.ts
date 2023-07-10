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

@Module({
  imports: [
    BrandsModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
  ],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductsResolver,
    ProductDetailsRepository,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
