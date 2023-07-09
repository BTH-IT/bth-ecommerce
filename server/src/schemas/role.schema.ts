import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { RoleAndFeature } from './role-and-feature.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: false,
})
@ObjectType()
export class Role extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
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
