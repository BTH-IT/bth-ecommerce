import { IsNotEmpty } from 'class-validator';

export class CreateNewImportOrderDto {
  @IsNotEmpty() importProducts: string[];
  @IsNotEmpty() supplier: string;
  @IsNotEmpty() employee: string;
  @IsNotEmpty() totalPay: number;
}

export class UpdateImportOrderDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() importProducts?: [string];
  @IsNotEmpty() supplier?: string;
  @IsNotEmpty() employee?: string;
  @IsNotEmpty() totalPay?: number;
}

export class DeleteImportOrderDto {
  @IsNotEmpty() _id: string;
}
