import { Injectable } from '@nestjs/common';
import { UploadsRepository } from './uploads.repo';
import { Upload } from '@/schemas/upload.schema';
import { CreateNewUploadDto } from '@/dto/upload.dto';

@Injectable()
export class UploadsService {
  constructor(private readonly uploadsRepository: UploadsRepository) {}

  async findOne(filename: string): Promise<Upload | null> {
    return this.uploadsRepository.findByCondition({
      filename,
    });
  }

  async createNewUpload(upload: CreateNewUploadDto): Promise<Upload> {
    return this.uploadsRepository.create(upload);
  }
}
