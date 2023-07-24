import { IsNotEmpty } from 'class-validator';

export class CreateNewOrderDetailDto {
  @IsNotEmpty() order: string;
  @IsNotEmpty() productDetail: string;
  @IsNotEmpty() product: string;
  @IsNotEmpty() price: number;
}

export class UpdateOrderDetailDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() order?: string;
  @IsNotEmpty() productDetail?: string;
  @IsNotEmpty() product?: string;
  @IsNotEmpty() price?: number;
}

export class DeleteOrderDetailDto {
  @IsNotEmpty() _id: string;
}
