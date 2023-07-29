import { IsNotEmpty } from 'class-validator';

export class CreateNewImportOrderDetailDto {
  @IsNotEmpty() product: string;
  @IsNotEmpty() price: number;
  @IsNotEmpty() amount: number;
  @IsNotEmpty() importOrder: string;
}

export class UpdateImportOrderDetailDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() importOrder?: string;
  @IsNotEmpty() product?: string;
  @IsNotEmpty() price?: number;
  @IsNotEmpty() amount?: number;
}

export class DeleteImportOrderDetailDto {
  @IsNotEmpty() _id: string;
}
