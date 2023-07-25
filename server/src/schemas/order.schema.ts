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
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'OrderDetail' })
  @Field(() => [OrderDetail])
  boughtProducts: [OrderDetail];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    default: undefined,
  })
  @Field(() => User, {
    defaultValue: undefined,
  })
  employee: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  user: User;

  @Prop()
  @Field()
  purchaseForm: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  address: string;

  @Prop()
  @Field()
  fullname: string;

  @Prop()
  @Field()
  totalPay: number;

  @Prop({ default: 'waiting' })
  @Field({ defaultValue: 'waiting' })
  status: string;

  @Prop({ default: false })
  @Field({ defaultValue: false })
  isPaid: boolean;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isHidden: boolean;
}
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
