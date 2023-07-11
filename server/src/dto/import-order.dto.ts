import { IsNotEmpty } from 'class-validator';

export class CreateNewImportOrderDto {
  @IsNotEmpty() importedProducts: [string];
  @IsNotEmpty() supplier: string;
  @IsNotEmpty() employee: string;
}

export class UpdateImportOrderDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() importedProducts?: [string];
  @IsNotEmpty() supplier?: string;
  @IsNotEmpty() employee?: string;
}

export class DeleteImportOrderDto {
  @IsNotEmpty() _id: string;
}
