import { IsNotEmpty } from 'class-validator';

export class CreateNewProductDetailDto {
  @IsNotEmpty() product: string;
}

export class UpdateProductDetailDto {
  @IsNotEmpty() product: string;
}

export class DeleteProductDetailDto {
  @IsNotEmpty() _id: string;
}
