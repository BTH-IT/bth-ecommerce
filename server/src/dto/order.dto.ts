import { IsNotEmpty } from 'class-validator';

export class CreateNewOrderDto {
  @IsNotEmpty() boughtProducts: [string];
  @IsNotEmpty() employee: string;
  @IsNotEmpty() user: string;
  @IsNotEmpty() purchaseForm: string;
}

export class UpdateOrderDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() boughtProducts?: [string];
  @IsNotEmpty() employee?: string;
  @IsNotEmpty() user?: string;
  @IsNotEmpty() purchaseForm?: string;
}

export class DeleteOrderDto {
  @IsNotEmpty() _id: string;
}
