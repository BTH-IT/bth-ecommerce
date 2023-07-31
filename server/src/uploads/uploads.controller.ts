import {
  Controller,
  Delete,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { DeleteUploadDto } from '@/dto/upload.dto';

@Controller('upload')
export class UploadsController {
  constructor(
    private uploadsService: UploadsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if ((file && !file.originalname) || !file) {
      return null;
    }

    const filename = file.originalname;

    const upload = await this.uploadsService.findOne(filename);

    if (upload) {
      return {
        filename: upload.filename,
        secureUrl: upload.imageUrl,
        publicId: upload.publicId,
      };
    }

    const cloudinaryFile = await this.cloudinaryService.uploadFile(file);

    await this.uploadsService.createNewUpload({
      filename,
      imageUrl: cloudinaryFile.secure_url,
      publicId: cloudinaryFile.public_id,
    });

    return {
      publicId: cloudinaryFile.public_id,
      filename,
      secureUrl: cloudinaryFile.secure_url,
    };
  }

  @Delete('single/:filename/:publicId')
  async deleteFile(@Param() param: DeleteUploadDto, @Response() res: any) {
    try {
      await this.uploadsService.deleteUpload(param);

      await this.cloudinaryService.deleteFile(param.publicId);

      return { message: 'delete success' };
    } catch (error) {
      return error;
    }
  }

  @Delete('multiple')
  async deleteFiles(@Param() uploadDeletes: DeleteUploadDto[]) {
    try {
      await Promise.all(
        uploadDeletes.map(async (uploadDelete): Promise<any> => {
          await this.uploadsService.deleteUpload(uploadDelete);

          await this.cloudinaryService.deleteFile(uploadDelete.publicId);
        }),
      );
      return { message: 'delete success' };
    } catch (error) {
      return error;
    }
  }

  @Post('multiple')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() files: Express.Multer.File[]) {
    const uploadMultiple = await Promise.all(
      files.map(async (file): Promise<any> => {
        const upload = await this.uploadFile(file);
        return upload;
      }),
    );
    return uploadMultiple;
  }
}
