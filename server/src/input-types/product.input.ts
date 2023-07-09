import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateNewProductInput {
  @Field()
  productName: string;

  @Field((type) => [String])
  imageUrlList: [string];

  @Field()
  warranteeYear: number;

  @Field()
  originPrice: number;

  @Field()
  salePercent: number;

  @Field()
  description: string;

  @Field()
  brand: string;

  @Field()
  generateCpu: string;

  @Field()
  cpu: string;

  @Field()
  seriesCpu: string;

  @Field()
  chip: string;

  @Field()
  ramName: string;

  @Field()
  ramSize: number;

  @Field()
  screen: string;

  @Field()
  storageName: string;

  @Field()
  storageSize: number;

  @Field()
  storagePortName: string;

  @Field()
  storagePortNum: number;

  @Field()
  storagePortMaximum: number;

  @Field()
  supportM2slotType: string;

  @Field()
  screenOutputPortName: string;

  @Field()
  screenOutputPortNum: number;

  @Field()
  bluetooth: string;

  @Field()
  keyboard: string;

  @Field()
  operationSystem: string;

  @Field()
  size: string;

  @Field()
  pin: number;

  @Field()
  weight: number;

  @Field()
  seriesLaptop: string;

  @Field()
  partNumber: string;

  @Field()
  color: string;

  @Field()
  accessoriesIncluded: string;

  @Field()
  led: boolean;

  @Field()
  touchScreen: boolean;

  @Field()
  soldNum: number;
}

@InputType()
export class UpdateNewProductInput {
  @Field()
  _id: string;

  @Field()
  productName?: string;

  @Field((type) => [String])
  imageUrlList?: [string];

  @Field()
  warranteeYear?: number;

  @Field()
  originPrice?: number;

  @Field()
  salePercent?: number;

  @Field()
  description?: string;

  @Field()
  brand?: string;

  @Field()
  generateCpu?: string;

  @Field()
  cpu?: string;

  @Field()
  seriesCpu?: string;

  @Field()
  chip?: string;

  @Field()
  ramName?: string;

  @Field()
  ramSize?: number;

  @Field()
  screen?: string;

  @Field()
  storageName?: string;

  @Field()
  storageSize?: number;

  @Field()
  storagePortName?: string;

  @Field()
  storagePortNum?: number;

  @Field()
  storagePortMaximum?: number;

  @Field()
  supportM2slotType?: string;

  @Field()
  screenOutputPortName?: string;

  @Field()
  screenOutputPortNum?: number;

  @Field()
  bluetooth?: string;

  @Field()
  keyboard?: string;

  @Field()
  operationSystem?: string;

  @Field()
  size?: string;

  @Field()
  pin?: number;

  @Field()
  weight?: number;

  @Field()
  seriesLaptop?: string;

  @Field()
  partNumber?: string;

  @Field()
  color?: string;

  @Field()
  accessoriesIncluded?: string;

  @Field()
  led?: boolean;

  @Field()
  touchScreen?: boolean;

  @Field()
  soldNum?: number;
}
