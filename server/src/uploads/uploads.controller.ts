import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller('upload')
export class UploadsController {
  constructor(
    private uploadsService: UploadsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filename = file.originalname;
    const upload = await this.uploadsService.findOne(filename);

    if (upload) {
      return upload.imageUrl;
    }

    const cloudinaryFile = await this.cloudinaryService.uploadFile(file);

    await this.uploadsService.createNewUpload({
      filename,
      imageUrl: cloudinaryFile.secure_url,
    });

    return cloudinaryFile.secure_url;
  }

  @Post('multiple')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() files: Express.Multer.File[]) {
    console.log(files);
    // return this.cloudinaryService.uploadFiles(file);
  }
}
