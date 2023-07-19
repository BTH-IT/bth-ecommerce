import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Account } from './account.schema';
import { Type } from './type.schema';
import { ObjectId } from '@/utils/contains';

@Schema({
  timestamps: true,
})
@ObjectType()
export class User extends BaseSchema {
  @Prop()
  @Field()
  fullname: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  gender: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  birthYear: number;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  @Field({ nullable: true })
  account: Account;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Type',
    default: new ObjectId('64b812725cad365e43238228'),
  })
  @Field(() => Type)
  type: Type;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
