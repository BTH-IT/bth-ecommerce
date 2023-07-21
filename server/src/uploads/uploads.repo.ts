import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { Upload } from '@/schemas/upload.schema';

@Injectable()
export class UploadsRepository extends BaseRepository<Upload> {
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<Upload>,
  ) {
    super(uploadModel);
  }
}
