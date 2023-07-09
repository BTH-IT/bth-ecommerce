import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { RoleAndFeature } from './role-and-feature.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Role extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop({ default: '' })
  @Field({ defaultValue: '' })
  description: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: RoleAndFeature.name })
  @Field(() => [RoleAndFeature])
  features: [RoleAndFeature];

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
