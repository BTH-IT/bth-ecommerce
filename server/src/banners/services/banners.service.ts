import {
  CreateNewBannerDto,
  DeleteBannerDto,
  ParamsBannerDto,
  UpdateBannerDto,
} from '@/dto/banner.dto';
import { Injectable } from '@nestjs/common';
import { BannersRepository } from '../repositories/banners.repo';
import { Banner } from '@/schemas/banner.schema';

@Injectable()
export class BannersService {
  constructor(private readonly bannersRepository: BannersRepository) {}

  async findAll(params: ParamsBannerDto): Promise<Banner[]> {
    const parameters: any = {
      ...params,
    };

    const filter: any = {};

    for (const key in params) {
      if (key === 'isShow' && parameters[key] !== null) {
        filter['isShow'] = true;
        continue;
      }

      if (key === 'search' && parameters[key] !== null) {
        const search = parameters[key];
        const re = new RegExp(`${search}`, 'i');
        filter['name'] = re;
        continue;
      }

      filter[key] = parameters[key];
    }

    return this.bannersRepository.getByCondition(filter);
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
