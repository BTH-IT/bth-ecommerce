import { Injectable } from '@nestjs/common';
import { ImportOrdersRepository } from './import-orders.repo';
import { ImportOrder } from '@/schemas/import-order.schema';
import {
  CreateNewImportOrderDto,
  DeleteImportOrderDto,
  UpdateImportOrderDto,
} from '@/dto/import-order.dto';

@Injectable()
export class ImportOrdersService {
  constructor(
    private readonly importOrdersRepository: ImportOrdersRepository,
  ) {}

  async findAll(): Promise<ImportOrder[]> {
    return this.importOrdersRepository.getByCondition({ isActive: true });
  }

  async findOne(id: string): Promise<ImportOrder | null> {
    return this.importOrdersRepository.findById(id);
  }

  async updateImportOrder(
    data: UpdateImportOrderDto,
  ): Promise<ImportOrder | null> {
    const { _id, ...importOrder } = data;
    return this.importOrdersRepository.findByIdAndUpdate(_id, importOrder);
  }

  async createNewImportOrder(
    data: CreateNewImportOrderDto,
  ): Promise<ImportOrder> {
    return this.importOrdersRepository.create(data);
  }

  async deleteImportOrder(data: DeleteImportOrderDto): Promise<any> {
    return this.importOrdersRepository.deleteOne(data._id);
  }
}
