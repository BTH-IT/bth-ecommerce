import { Injectable } from '@nestjs/common';
import { BrandsRepository } from '../repositories/brands.repo';
import { Brand } from '@/schemas/brand.schema';
import {
  CreateNewBrandDto,
  DeleteBrandDto,
  UpdateBrandDto,
} from '@/dto/brand.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async findAll(): Promise<Brand[]> {
    return this.brandsRepository.getByCondition({ isActive: true });
  }

  async findOne(id: string): Promise<Brand | null> {
    return this.brandsRepository.findByCondition({
      _id: id,
      isActive: true,
    });
  }

  async createNewBrand(brand: CreateNewBrandDto): Promise<Brand> {
    const newBrand = await this.brandsRepository.create(brand);

    return newBrand;
  }

  async updateBrand(data: UpdateBrandDto) {
    const { _id, ...brand } = data;
    return this.brandsRepository.findByIdAndUpdate(_id, {
      ...brand,
    });
  }

  async deleteBrand(data: DeleteBrandDto) {
    return this.brandsRepository.findByIdAndUpdate(data._id, {
      isActive: false,
    });
  }
}
