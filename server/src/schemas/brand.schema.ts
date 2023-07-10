import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Brand extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  thumbUrl: string;

  @Prop()
  @Field()
  iconUrl: string;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type BrandDocument = Brand & Document;
export const BrandSchema = SchemaFactory.createForClass(Brand);
