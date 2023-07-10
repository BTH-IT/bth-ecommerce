import { Injectable } from '@nestjs/common';
import { WarrantiesRepository } from './warranties.repo';
import { Warranty } from '@/schemas/warranty.schema';
import {
  CreateNewWarrantyDto,
  DeleteWarrantyDto,
  UpdateWarrantyDto,
} from '@/dto/warranty.dto';

@Injectable()
export class WarrantiesService {
  constructor(private readonly warrantiesRepository: WarrantiesRepository) {}

  async findOne(id: string): Promise<Warranty | null> {
    return this.warrantiesRepository.findById(id);
  }

  async findAll(): Promise<Warranty[]> {
    return this.warrantiesRepository.findAll();
  }

  async createNewWarranty(warranty: CreateNewWarrantyDto): Promise<Warranty> {
    return this.warrantiesRepository.create(warranty);
  }

  async updateWarranty(data: UpdateWarrantyDto): Promise<Warranty | null> {
    const { _id, ...Warrantie } = data;
    return this.warrantiesRepository.findByIdAndUpdate(_id, Warrantie);
  }

  async deleteWarranty(data: DeleteWarrantyDto): Promise<any> {
    return this.warrantiesRepository.deleteOne(data._id);
  }
}
