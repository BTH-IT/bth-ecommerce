import { IsNotEmpty } from 'class-validator';

export class CreateNewUploadDto {
  @IsNotEmpty() filename: string;
  @IsNotEmpty() imageUrl: string;
  @IsNotEmpty() publicId: string;
}

export class UpdateUploadDto {
  @IsNotEmpty() filename?: string;
  @IsNotEmpty() imageUrl?: string;
  @IsNotEmpty() publicId?: string;
}

export class DeleteUploadDto {
  @IsNotEmpty() filename: string;
  @IsNotEmpty() publicId: string;
}
