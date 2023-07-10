import { Injectable } from '@nestjs/common';
import { SuppliersRepository } from './suppliers.repo';
import { Supplier } from '@/schemas/supplier.schema';
import {
  CreateNewSupplierDto,
  DeleteSupplierDto,
  UpdateSupplierDto,
} from '@/dto/supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}

  async findAll(): Promise<Supplier[]> {
    return this.suppliersRepository.getByCondition({ isActive: true });
  }

  async findOne(id: string): Promise<Supplier | null> {
    return this.suppliersRepository.findByCondition({
      _id: id,
      isActive: true,
    });
  }

  async createNewSupplier(supplier: CreateNewSupplierDto): Promise<Supplier> {
    const newSupplier = await this.suppliersRepository.create(supplier);

    return newSupplier;
  }

  async updateSupplier(data: UpdateSupplierDto) {
    const { _id, ...Supplier } = data;
    return this.suppliersRepository.findByIdAndUpdate(_id, {
      ...Supplier,
    });
  }

  async deleteSupplier(data: DeleteSupplierDto) {
    return this.suppliersRepository.findByIdAndUpdate(data._id, {
      isActive: false,
    });
  }
}
