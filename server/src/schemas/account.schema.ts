import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Role } from './role.schema';
import { ObjectId } from '@/utils/contains';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Account extends BaseSchema {
  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field()
  picture: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Role',
    default: new ObjectId('64b8117e3b5dd17f872bb02b'),
  })
  @Field({ defaultValue: new ObjectId('64b8117e3b5dd17f872bb02b') })
  role: Role;

  @Prop({ default: 'default' })
  @Field({ defaultValue: 'default' })
  type: string;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
