import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Role } from './role.schema';
import { Feature } from './feature.schema';
import { ACTIONLIST } from '@/utils/constains';

@Schema({
  timestamps: false,
})
@ObjectType()
export class RoleAndFeature {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  @Field(() => Role)
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Feature.name })
  @Field(() => Feature)
  feature: Feature;

  @Prop({ default: ACTIONLIST })
  @Field(() => [String])
  actions: [string];

  @Prop({ default: true })
  @Field({ defaultValue: true })
  isActive: boolean;
}
export type RoleAndFeatureDocument = RoleAndFeature & Document;
export const RoleAndFeatureSchema =
  SchemaFactory.createForClass(RoleAndFeature);
