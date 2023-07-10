import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from '@/schemas/supplier.schema';
import { SuppliersRepository } from './suppliers.repo';
import { SuppliersService } from './suppliers.service';
import { SuppliersResolver } from './suppliers.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  providers: [SuppliersService, SuppliersResolver, SuppliersRepository],
  exports: [SuppliersService],
})
export class SuppliersModule {}
