import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

@Schema({
  timestamps: false,
})
@ObjectType()
export class Feature extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type FeatureDocument = Feature & Document;
export const FeatureSchema = SchemaFactory.createForClass(Feature);
