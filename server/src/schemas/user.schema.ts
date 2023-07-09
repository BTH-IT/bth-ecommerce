import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Role } from './role.schema';

@Schema({
  timestamps: false,
})
@ObjectType()
export class User extends BaseSchema {
  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field()
  picture: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  @Field()
  role: Role;

  @Prop()
  @Field()
  type: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
