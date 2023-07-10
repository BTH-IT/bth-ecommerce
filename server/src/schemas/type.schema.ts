import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Type extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type TypeDocument = Type & Document;
export const TypeSchema = SchemaFactory.createForClass(Type);
