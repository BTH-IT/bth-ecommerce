import { IsNotEmpty } from 'class-validator';

export class DateRangeDto {
  @IsNotEmpty() from?: Date;
  @IsNotEmpty() to?: Date;
}

export class ParamsOrderDto {
  @IsNotEmpty() userId?: string;
  @IsNotEmpty() type?: string;
  @IsNotEmpty() dateRange?: DateRangeDto;
  @IsNotEmpty() isHidden?: boolean;
  @IsNotEmpty() search?: string;
  @IsNotEmpty() report?: boolean;
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
  @IsNotEmpty() user: string;
  @IsNotEmpty() purchaseForm?: string;
  @IsNotEmpty() status?: string;
  @IsNotEmpty() fullname?: string;
  @IsNotEmpty() address?: string;
  @IsNotEmpty() phone?: string;
}

export class DeleteOrderDto {
  @IsNotEmpty() _id: string;
}
