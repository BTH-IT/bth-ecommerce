import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { BrandsRepository } from './brands.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '@/schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  providers: [BrandsService, BrandsResolver, BrandsRepository],
  exports: [BrandsService],
})
export class BrandsModule {}
