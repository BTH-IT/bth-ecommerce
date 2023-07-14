import { IsNotEmpty } from 'class-validator';

export class CreateNewBannerDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() description?: string;
  @IsNotEmpty() thumbUrl: string;
}

export class UpdateBannerDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  @IsNotEmpty() description?: string;
  @IsNotEmpty() thumbUrl?: string;
  @IsNotEmpty() isShow?: boolean;
}

export class DeleteBannerDto {
  @IsNotEmpty() _id: string;
}
