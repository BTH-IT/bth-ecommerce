import { IsNotEmpty } from 'class-validator';

export class CreateNewUploadDto {
  @IsNotEmpty() filename: string;
  @IsNotEmpty() imageUrl?: string;
}

export class UpdateUploadDto {
  @IsNotEmpty() filename?: string;
  @IsNotEmpty() imageUrl?: string;
}

export class DeleteUploadDto {
  @IsNotEmpty() filename?: string;
}
