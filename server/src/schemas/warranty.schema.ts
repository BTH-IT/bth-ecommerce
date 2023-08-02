import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Warranty extends BaseSchema {
  @Prop()
  @Field()
  productDetail: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  @Field(() => Product)
  product: Product;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User;

  @Prop({ default: 0 })
  @Field({ defaultValue: 0 })
  warrantyYear: number;
}
export type WarrantyDocument = Warranty & Document;
export const WarrantySchema = SchemaFactory.createForClass(Warranty);
