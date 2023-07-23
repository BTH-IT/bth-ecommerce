import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema';
import { BaseSchema } from './base.schema';
import { Order } from './order.schema';
import { ProductDetail } from './product-detail.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class OrderDetail extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  @Field(() => Order)
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  @Field(() => Product)
  product: Product;

  @Prop()
  @Field(() => String)
  productDetail: string;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field()
  amount: number;
}
export type OrderDetailDocument = OrderDetail & Document;
export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
