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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warranty.name, schema: WarrantySchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    WarrantiesService,
    WarrantiesResolver,
    WarrantiesRepository,
    ProductDetailsRepository,
    ProductsService,
    ProductsRepository,
  ],
})
export class WarrantiesModule {}
