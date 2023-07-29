import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { BaseSchema } from './base.schema';
import { Supplier } from './supplier.schema';
import { User } from './user.schema';
import { ImportOrderDetail } from './import-order-detail.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class ImportOrder extends BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ImportOrderDetail' })
  @Field(() => [ImportOrderDetail])
  importProducts: [ImportOrderDetail];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  @Field(() => Supplier)
  supplier: Supplier;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  employee: User;

  @Prop()
  @Field()
  totalPay: number;
}
export type ImportOrderDocument = ImportOrder & Document;
export const ImportOrderSchema = SchemaFactory.createForClass(ImportOrder);
