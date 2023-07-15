import { IsNotEmpty, IsPositive } from 'class-validator';

export class ProductParamsDto {
  @IsNotEmpty()
  sort?: string;

  @IsNotEmpty()
  sale?: boolean;
}

export class CreateNewProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  imageUrlList: [string];

  @IsNotEmpty()
  @IsPositive()
  warranteeYear: number;

  @IsNotEmpty()
  @IsPositive()
  originPrice: number;

  @IsNotEmpty()
  @IsPositive()
  salePercent: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  generateCpu: string;

  @IsNotEmpty()
  cpu: string;

  @IsNotEmpty()
  seriesCpu: string;

  @IsNotEmpty()
  chip: string;

  @IsNotEmpty()
  ramName: string;

  @IsNotEmpty()
  @IsPositive()
  ramSize: number;

  @IsNotEmpty()
  screen: string;

  @IsNotEmpty()
  storageName: string;

  @IsNotEmpty()
  @IsPositive()
  storageSize: number;

  @IsNotEmpty()
  storagePortName: string;

  @IsNotEmpty()
  @IsPositive()
  storagePortNum: number;

  @IsNotEmpty()
  @IsPositive()
  storagePortMaximum: number;

  @IsNotEmpty()
  supportM2slotType: string;

  @IsNotEmpty()
  screenOutputPortName: string;

  @IsNotEmpty()
  @IsPositive()
  screenOutputPortNum: number;

  @IsNotEmpty()
  bluetooth: string;

  @IsNotEmpty()
  keyboard: string;

  @IsNotEmpty()
  operationSystem: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  @IsPositive()
  pin: number;

  @IsNotEmpty()
  @IsPositive()
  weight: number;

  @IsNotEmpty()
  seriesLaptop: string;

  @IsNotEmpty()
  @IsPositive()
  partNumber: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  accessoriesIncluded: string;

  @IsNotEmpty()
  led: boolean;

  @IsNotEmpty()
  touchScreen: boolean;

  @IsNotEmpty()
  @IsPositive()
  soldNum: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  productName?: string;

  @IsNotEmpty()
  imageUrlList?: [string];

  @IsNotEmpty()
  @IsPositive()
  warranteeYear?: number;

  @IsNotEmpty()
  @IsPositive()
  originPrice?: number;

  @IsNotEmpty()
  @IsPositive()
  salePercent?: number;

  @IsNotEmpty()
  description?: string;

  @IsNotEmpty()
  brand?: string;

  @IsNotEmpty()
  generateCpu?: string;

  @IsNotEmpty()
  cpu?: string;

  @IsNotEmpty()
  seriesCpu?: string;

  @IsNotEmpty()
  chip?: string;

  @IsNotEmpty()
  ramName?: string;

  @IsNotEmpty()
  @IsPositive()
  ramSize?: number;

  @IsNotEmpty()
  screen?: string;

  @IsNotEmpty()
  storageName?: string;

  @IsNotEmpty()
  @IsPositive()
  storageSize?: number;

  @IsNotEmpty()
  storagePortName?: string;

  @IsNotEmpty()
  @IsPositive()
  storagePortNum?: number;

  @IsNotEmpty()
  @IsPositive()
  storagePortMaximum?: number;

  @IsNotEmpty()
  supportM2slotType?: string;

  @IsNotEmpty()
  screenOutputPortName?: string;

  @IsNotEmpty()
  @IsPositive()
  screenOutputPortNum?: number;

  @IsNotEmpty()
  bluetooth?: string;

  @IsNotEmpty()
  keyboard?: string;

  @IsNotEmpty()
  operationSystem?: string;

  @IsNotEmpty()
  size?: string;

  @IsNotEmpty()
  @IsPositive()
  pin?: number;

  @IsNotEmpty()
  @IsPositive()
  weight?: number;

  @IsNotEmpty()
  seriesLaptop?: string;

  @IsNotEmpty()
  partNumber?: string;

  @IsNotEmpty()
  color?: string;

  @IsNotEmpty()
  accessoriesIncluded?: string;

  @IsNotEmpty()
  led?: boolean;

  @IsNotEmpty()
  touchScreen?: boolean;

  @IsNotEmpty()
  @IsPositive()
  soldNum?: number;
}

export class DeleteProductDto {
  @IsNotEmpty()
  _id: string;
}
