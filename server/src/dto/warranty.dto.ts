import { IsNotEmpty, IsPositive } from 'class-validator';

export class ParamsWarrantyDto {
  @IsNotEmpty() search?: string;
}

export class CreateNewWarrantyDto {
  @IsNotEmpty()
  @IsPositive()
  warrantyYear: number;

  @IsNotEmpty() productDetail: string;

  @IsNotEmpty() product: string;

  @IsNotEmpty()
  user: string;
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
