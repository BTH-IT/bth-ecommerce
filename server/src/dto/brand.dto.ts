import { IsNotEmpty } from 'class-validator';

export class CreateNewBrandDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() thumbUrl: string;
  @IsNotEmpty() iconUrl: string;
}

export class UpdateBrandDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  @IsNotEmpty() thumbUrl?: string;
  @IsNotEmpty() iconUrl?: string;
}

export class DeleteBrandDto {
  @IsNotEmpty() _id: string;
}
