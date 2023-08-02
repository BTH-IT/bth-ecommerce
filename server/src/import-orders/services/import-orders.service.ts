import { Injectable } from '@nestjs/common';
import { ImportOrdersRepository } from '../repositories/import-orders.repo';
import { ImportOrder } from '@/schemas/import-order.schema';
import {
  CreateNewImportOrderDto,
  DeleteImportOrderDto,
  ParamsImportOrderDto,
  UpdateImportOrderDto,
} from '@/dto/import-order.dto';

@Injectable()
export class ImportOrdersService {
  constructor(
    private readonly importOrdersRepository: ImportOrdersRepository,
  ) {}

  async findAll(params: ParamsImportOrderDto): Promise<ImportOrder[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = {};

    for (const key in params) {
      if (key === 'dateRange' && parameters[key] !== null) {
        filter['createdAt'] = {
          $gte: parameters[key].from,
          $lt: parameters[key].to,
        };
        continue;
      }

      if (key === 'search' && parameters[key] !== null) {
        const search = parameters[key];
        const re = new RegExp(`${search}`, 'i');

        filter['$text'] = {
          $search: re,
        };
        continue;
      }

      filter[key] = parameters[key];
    }

    return this.importOrdersRepository.getByCondition(filter);
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
