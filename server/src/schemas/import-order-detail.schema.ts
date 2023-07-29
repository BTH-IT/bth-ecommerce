import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { BaseSchema } from './base.schema';
import { ImportOrder } from './import-order.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class ImportOrderDetail extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ImportOrder' })
  @Field(() => ImportOrder)
  importOrder: ImportOrder;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  @Field(() => Product)
  product: Product;

  @Prop()
  @Field()
  price: number;

  @Field({ defaultValue: 0 })
  amount: number;
}
export type ImportOrderDetailDocument = ImportOrderDetail & Document;
export const ImportOrderDetailSchema =
  SchemaFactory.createForClass(ImportOrderDetail);
