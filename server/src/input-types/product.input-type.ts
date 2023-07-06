import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateNewProductInput {
  @Field()
  productName: String;

  @Field(type => [String])
  imageUrlList: [String];

  @Field()
  warranteeYear: Number;

  @Field()
  originPrice: Number;

  @Field()
  salePercent: Number;

  @Field()
  description: String;

  @Field()
  brand: String;

  @Field()
  generateCpu: String;

  @Field()
  cpu: String;

  @Field()
  seriesCpu: String;

  @Field()
  chip: String;

  @Field()
  ramName: String;

  @Field()
  ramSize: Number;

  @Field()
  screen: String;

  @Field()
  storageName: String;

  @Field()
  storageSize: Number;

  @Field()
  storagePortName: String;

  @Field()
  storagePortNum: Number;

  @Field()
  storagePortMaximum: Number;

  @Field()
  supportM2slotType: String;

  @Field()
  screenOutputPortName: String;

  @Field()
  screenOutputPortNum: Number;

  @Field()
  bluetooth: String;

  @Field()
  keyboard: String;

  @Field()
  operationSystem: String;

  @Field()
  size: String;

  @Field()
  pin: Number;

  @Field()
  weight: Number;

  @Field()
  seriesLaptop: String;

  @Field()
  partNumber: String;

  @Field()
  color: String;

  @Field()
  accessoriesIncluded: String;

  @Field()
  led: Boolean;

  @Field()
  touchScreen: Boolean;

  @Field()
  soldNum: Number;
}