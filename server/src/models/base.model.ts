import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType("BaseModel")
export class BaseModel {
  @Field(type => ID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}