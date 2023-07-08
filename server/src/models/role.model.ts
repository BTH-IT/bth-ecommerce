import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType("RoleModel")
export class RoleModel extends BaseModel {
  @Field()
  name: String;

  @Field()
  description: String;

  @Field(type => [String])
  actions: [String];

  @Field()
  isActive: Boolean;
}