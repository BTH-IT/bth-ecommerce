import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewWarrantyDto {
  @IsNotEmpty()
  @IsPositive()
  warrantyYear: number;

  @IsNotEmpty() productDetail: string;

  @IsNotEmpty() product: string;
}

export class UpdateWarrantyDto {
  @IsNotEmpty() _id: string;

  @IsNotEmpty()
  @IsPositive()
  warrantyYear?: number;

  @IsNotEmpty() productDetail?: string;

  @IsNotEmpty() product?: string;
}

export class DeleteWarrantyDto {
  @IsNotEmpty() _id: string;
}
