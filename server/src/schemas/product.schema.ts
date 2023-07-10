import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Brand } from './brand.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Product extends BaseSchema {
  @Prop()
  @Field()
  productName: string;

  @Prop()
  @Field(() => [String])
  imageUrlList: [string];

  @Prop()
  @Field()
  warranteeYear: number;

  @Prop()
  @Field()
  originPrice: number;

  @Prop({ default: 0 })
  @Field({ defaultValue: 0 })
  salePercent: number;

  @Prop({ default: '' })
  @Field({ defaultValue: '' })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Brand' })
  @Field(() => Brand)
  brand: Brand;

  @Prop()
  @Field()
  generateCpu: string;

  @Prop()
  @Field()
  cpu: string;

  @Prop()
  @Field()
  seriesCpu: string;

  @Prop()
  @Field()
  chip: string;

  @Prop()
  @Field()
  ramName: string;

  @Prop()
  @Field()
  ramSize: number;

  @Prop()
  @Field()
  screen: string;

  @Prop()
  @Field()
  storageName: string;

  @Prop()
  @Field()
  storageSize: number;

  @Prop()
  @Field()
  storagePortName: string;

  @Prop()
  @Field()
  storagePortNum: number;

  @Prop()
  @Field()
  storagePortMaximum: number;

  @Prop()
  @Field()
  supportM2slotType: string;

  @Prop()
  @Field()
  screenOutputPortName: string;

  @Prop()
  @Field()
  screenOutputPortNum: number;

  @Prop()
  @Field()
  bluetooth: string;

  @Prop()
  @Field()
  keyboard: string;

  @Prop()
  @Field()
  operationSystem: string;

  @Prop()
  @Field()
  size: string;

  @Prop()
  @Field()
  pin: number;

  @Prop()
  @Field()
  weight: number;

  @Prop()
  @Field()
  seriesLaptop: string;

  @Prop()
  @Field()
  partNumber: string;

  @Prop()
  @Field()
  color: string;

  @Prop()
  @Field()
  accessoriesIncluded: string;

  @Prop()
  @Field()
  led: boolean;

  @Prop()
  @Field()
  touchScreen: boolean;

  @Prop({ default: 0 })
  @Field({ defaultValue: 0 })
  soldNum: number;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isHidden: boolean;

  @Field({ defaultValue: 0 })
  remain: number;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
