import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { UploadsRepository } from './uploads.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from '@/schemas/upload.schema';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    BullModule.registerQueue({
      name: 'upload-file',
    }),
  ],
  controllers: [UploadsController],
  providers: [
    CloudinaryProvider,
    CloudinaryService,
    UploadsService,
    UploadsController,
    UploadsRepository,
  ],
  exports: [CloudinaryProvider],
})
export class UploadsModule {}
