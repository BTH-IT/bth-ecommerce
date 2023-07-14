import {
  CreateNewBannerDto,
  DeleteBannerDto,
  UpdateBannerDto,
} from '@/dto/banner.dto';
import { Injectable } from '@nestjs/common';
import { BannersRepository } from '../repositories/banners.repo';
import { Banner } from '@/schemas/banner.schema';

@Injectable()
export class BannersService {
  constructor(private readonly bannersRepository: BannersRepository) {}

  async findAll(): Promise<Banner[]> {
    return this.bannersRepository.findAll();
  }

  async findOne(id: string): Promise<Banner | null> {
    return this.bannersRepository.findById(id);
  }

  async createNewBanner(Banner: CreateNewBannerDto): Promise<Banner> {
    const newBanner = await this.bannersRepository.create(Banner);

    return newBanner;
  }

  async updateBanner(data: UpdateBannerDto) {
    const { _id, ...banner } = data;
    return this.bannersRepository.findByIdAndUpdate(_id, {
      ...banner,
    });
  }

  async deleteBanner(data: DeleteBannerDto) {
    return this.bannersRepository.deleteOne(data._id);
  }
}
