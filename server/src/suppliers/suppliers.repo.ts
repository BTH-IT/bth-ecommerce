import { BaseRepository } from '@/base.repository';
import { Supplier } from '@/schemas/supplier.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SuppliersRepository extends BaseRepository<Supplier> {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
  ) {
    super(supplierModel);
  }
}
