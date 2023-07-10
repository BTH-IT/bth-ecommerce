import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { BaseSchema } from './base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class ProductDetail extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  @Field(() => Product)
  product: Product;
}
export type ProductDetailDocument = ProductDetail & Document;
export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
