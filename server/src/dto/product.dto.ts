import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  imageUrlList: [string];

  @IsNotEmpty()
  warranteeYear: number;

  @IsNotEmpty()
  originPrice: number;

  @IsNotEmpty()
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
  ramSize: number;

  @IsNotEmpty()
  screen: string;

  @IsNotEmpty()
  storageName: string;

  @IsNotEmpty()
  storageSize: number;

  @IsNotEmpty()
  storagePortName: string;

  @IsNotEmpty()
  storagePortNum: number;

  @IsNotEmpty()
  storagePortMaximum: number;

  @IsNotEmpty()
  supportM2slotType: string;

  @IsNotEmpty()
  screenOutputPortName: string;

  @IsNotEmpty()
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
  pin: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  seriesLaptop: string;

  @IsNotEmpty()
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
  soldNum: number;
}

export class UpdateNewProductDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  productName?: string;

  @IsNotEmpty()
  imageUrlList?: [string];

  @IsNotEmpty()
  warranteeYear?: number;

  @IsNotEmpty()
  originPrice?: number;

  @IsNotEmpty()
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
  ramSize?: number;

  @IsNotEmpty()
  screen?: string;

  @IsNotEmpty()
  storageName?: string;

  @IsNotEmpty()
  storageSize?: number;

  @IsNotEmpty()
  storagePortName?: string;

  @IsNotEmpty()
  storagePortNum?: number;

  @IsNotEmpty()
  storagePortMaximum?: number;

  @IsNotEmpty()
  supportM2slotType?: string;

  @IsNotEmpty()
  screenOutputPortName?: string;

  @IsNotEmpty()
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
  pin?: number;

  @IsNotEmpty()
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
  soldNum?: number;
}
