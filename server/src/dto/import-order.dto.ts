import { IsNotEmpty } from 'class-validator';
import { DateRangeDto } from './order.dto';

export class ParamsImportOrderDto {
  @IsNotEmpty() search?: string;
  @IsNotEmpty() dateRange?: DateRangeDto;
}
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
