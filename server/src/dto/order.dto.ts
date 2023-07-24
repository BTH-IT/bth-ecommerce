import { IsNotEmpty } from 'class-validator';

export class ParamsOrderDto {
  @IsNotEmpty() userId?: string;
  @IsNotEmpty() type?: string;
}

export class CreateNewOrderDto {
  @IsNotEmpty() boughtProducts: string[];
  @IsNotEmpty() employee?: string;
  @IsNotEmpty() user: string;
  @IsNotEmpty() purchaseForm: string;
  @IsNotEmpty() status: string;
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() address: string;
  @IsNotEmpty() phone: string;
}

export class UpdateOrderDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() boughtProducts?: [string];
  @IsNotEmpty() employee?: string;
  @IsNotEmpty() user?: string;
  @IsNotEmpty() purchaseForm?: string;
  @IsNotEmpty() status?: string;
  @IsNotEmpty() fullname?: string;
  @IsNotEmpty() address?: string;
  @IsNotEmpty() phone?: string;
}

export class DeleteOrderDto {
  @IsNotEmpty() _id: string;
}
