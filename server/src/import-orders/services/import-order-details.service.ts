import {
  CreateNewImportOrderDetailDto,
  DeleteImportOrderDetailDto,
} from '../../dto/import-order-details.dto';
import { Injectable } from '@nestjs/common';
import { ImportOrderDetailsRepository } from '../repositories/import-order-details.repo';
import { ImportOrderDetail } from '@/schemas/import-order-detail.schema';
import { UpdateImportOrderDetailDto } from '@/dto/import-order-details.dto';

@Injectable()
export class ImportOrderDetailsService {
  constructor(
    private readonly importOrderDetailsRepository: ImportOrderDetailsRepository,
  ) {}

  async findAll(): Promise<ImportOrderDetail[]> {
    return this.importOrderDetailsRepository.findAll();
  }

  async findOne(id: string): Promise<ImportOrderDetail | null> {
    return this.importOrderDetailsRepository.findById(id);
  }

  async findManyByCondition(
    data: [ImportOrderDetail],
  ): Promise<ImportOrderDetail[]> {
    const importOrderDetailIdList = data.map((importOrder) => importOrder._id);

    return this.importOrderDetailsRepository.getByCondition({
      where: {
        _id: {
          $in: importOrderDetailIdList,
        },
      },
    });
  }

  async updateImportOrderDetail(
    data: UpdateImportOrderDetailDto,
  ): Promise<ImportOrderDetail | null> {
    const { _id, ...importOrderDetail } = data;
    return this.importOrderDetailsRepository.findByIdAndUpdate(
      _id,
      importOrderDetail,
    );
  }

  async createNewImportOrderDetailDto(
    data: CreateNewImportOrderDetailDto,
  ): Promise<ImportOrderDetail> {
    return this.importOrderDetailsRepository.create(data);
  }

  async deleteImportOrderDetail(
    data: DeleteImportOrderDetailDto,
  ): Promise<any> {
    return this.importOrderDetailsRepository.deleteOne(data._id);
  }
}
