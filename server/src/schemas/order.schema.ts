import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { BaseSchema } from './base.schema';
import { User } from './user.schema';
import { OrderDetail } from './order-detail.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Order extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'OrderDetail' })
  @Field(() => [OrderDetail])
  boughtProducts: [OrderDetail];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  employee: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User;

  @Prop()
  @Field()
  purchaseForm: string;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isHidden: boolean;
}
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
