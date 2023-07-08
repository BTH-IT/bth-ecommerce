import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateNewProductDto {
  @IsNotEmpty()
  productName: String;

  @IsNotEmpty()
  imageUrlList: [String];

  @IsNotEmpty()
  warranteeYear: Number;

  @IsNotEmpty()
  originPrice: Number;

  @IsNotEmpty()
  salePercent: Number;

  @IsNotEmpty()
  description: String;

  @IsNotEmpty()
  brand: String;

  @IsNotEmpty()
  generateCpu: String;

  @IsNotEmpty()
  cpu: String;

  @IsNotEmpty()
  seriesCpu: String;

  @IsNotEmpty()
  chip: String;

  @IsNotEmpty()
  ramName: String;

  @IsNotEmpty()
  ramSize: Number;

  @IsNotEmpty()
  screen: String;

  @IsNotEmpty()
  storageName: String;

  @IsNotEmpty()
  storageSize: Number;

  @IsNotEmpty()
  storagePortName: String;

  @IsNotEmpty()
  storagePortNum: Number;

  @IsNotEmpty()
  storagePortMaximum: Number;

  @IsNotEmpty()
  supportM2slotType: String;

  @IsNotEmpty()
  screenOutputPortName: String;

  @IsNotEmpty()
  screenOutputPortNum: Number;

  @IsNotEmpty()
  bluetooth: String;

  @IsNotEmpty()
  keyboard: String;

  @IsNotEmpty()
  operationSystem: String;

  @IsNotEmpty()
  size: String;

  @IsNotEmpty()
  pin: Number;

  @IsNotEmpty()
  weight: Number;

  @IsNotEmpty()
  seriesLaptop: String;

  @IsNotEmpty()
  partNumber: String;

  @IsNotEmpty()
  color: String;

  @IsNotEmpty()
  accessoriesIncluded: String;

  @IsNotEmpty()
  led: Boolean;

  @IsNotEmpty()
  touchScreen: Boolean;

  @IsNotEmpty()
  soldNum: Number;
}

export class UpdateNewProductDto {
  @IsNotEmpty()
  _id: String;

  @IsNotEmpty()
  productName?: String;

  @IsNotEmpty()
  imageUrlList?: [String];

  @IsNotEmpty()
  warranteeYear?: Number;

  @IsNotEmpty()
  originPrice?: Number;

  @IsNotEmpty()
  salePercent?: Number;

  @IsNotEmpty()
  description?: String;

  @IsNotEmpty()
  brand?: String;

  @IsNotEmpty()
  generateCpu?: String;

  @IsNotEmpty()
  cpu?: String;

  @IsNotEmpty()
  seriesCpu?: String;

  @IsNotEmpty()
  chip?: String;

  @IsNotEmpty()
  ramName?: String;

  @IsNotEmpty()
  ramSize?: Number;

  @IsNotEmpty()
  screen?: String;

  @IsNotEmpty()
  storageName?: String;

  @IsNotEmpty()
  storageSize?: Number;

  @IsNotEmpty()
  storagePortName?: String;

  @IsNotEmpty()
  storagePortNum?: Number;

  @IsNotEmpty()
  storagePortMaximum?: Number;

  @IsNotEmpty()
  supportM2slotType?: String;

  @IsNotEmpty()
  screenOutputPortName?: String;

  @IsNotEmpty()
  screenOutputPortNum?: Number;

  @IsNotEmpty()
  bluetooth?: String;

  @IsNotEmpty()
  keyboard?: String;

  @IsNotEmpty()
  operationSystem?: String;

  @IsNotEmpty()
  size?: String;

  @IsNotEmpty()
  pin?: Number;

  @IsNotEmpty()
  weight?: Number;

  @IsNotEmpty()
  seriesLaptop?: String;

  @IsNotEmpty()
  partNumber?: String;

  @IsNotEmpty()
  color?: String;

  @IsNotEmpty()
  accessoriesIncluded?: String;

  @IsNotEmpty()
  led?: Boolean;

  @IsNotEmpty()
  touchScreen?: Boolean;

  @IsNotEmpty()
  soldNum?: Number;
}