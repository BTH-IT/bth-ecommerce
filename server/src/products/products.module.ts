import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductSchema } from '../schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from './repositories/products.repo';
import { ProductsResolver } from './resolvers/products.resolver';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "products", schema: ProductSchema }]), RolesModule],
  providers: [ProductsService, ProductsRepository, ProductsResolver],
  exports: [ProductsService]
})
export class ProductsModule {}
