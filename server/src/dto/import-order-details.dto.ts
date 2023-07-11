import { IsNotEmpty } from 'class-validator';

export class CreateNewImportOrderDetailDto {
  @IsNotEmpty() product: string;
  @IsNotEmpty() importPrice: number;
  @IsNotEmpty() amount: number;
}

export class UpdateImportOrderDetailDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() product?: string;
  @IsNotEmpty() importPrice?: number;
  @IsNotEmpty() amount?: number;
}

export class DeleteImportOrderDetailDto {
  @IsNotEmpty() _id: string;
}
