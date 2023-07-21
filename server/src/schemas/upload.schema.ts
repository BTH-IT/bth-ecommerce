import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: false,
})
@ObjectType()
export class Upload {
  @Prop()
  @Field(() => String)
  filename: string;

  @Prop({ default: '' })
  @Field({ defaultValue: '' })
  imageUrl?: string;

  @Prop()
  @Field(() => Date)
  createdAt: Date = new Date();

  @Prop()
  @Field(() => Date)
  updatedAt: Date = new Date();
}
export type UploadDocument = Upload & Document;
export const UploadSchema = SchemaFactory.createForClass(Upload);
