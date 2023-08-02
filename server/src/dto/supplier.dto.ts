import { IsNotEmpty } from 'class-validator';

export class ParamsSupplierDto {
  @IsNotEmpty() search?: string;
}

export class CreateNewSupplierDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() phoneNum: string;
  @IsNotEmpty() address: string;
}

export class UpdateSupplierDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  @IsNotEmpty() phoneNum?: string;
  @IsNotEmpty() address?: string;
}

export class DeleteSupplierDto {
  @IsNotEmpty() _id: string;
}
