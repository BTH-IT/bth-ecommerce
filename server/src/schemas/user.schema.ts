import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Account } from './account.schema';
import { Type } from './type.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class User extends BaseSchema {
  @Prop()
  @Field()
  fullname: string;

  @Prop()
  @Field()
  gender: string;

  @Prop()
  @Field()
  age: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  @Field({ nullable: true })
  account: Account;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Type' })
  @Field(() => Type)
  type: Type;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
