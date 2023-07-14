import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Banner extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  thumbUrl: string;

  @Prop({ default: false })
  @Field({ defaultValue: false })
  isShow: boolean;
}
export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
