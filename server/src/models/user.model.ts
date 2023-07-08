import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/models/base.model';

@ObjectType("UserModel")
export class UserModel extends BaseModel {
  @Field()
  email: String;

  @Field()
  password: String;

  @Field()
  picture: String;

  @Field()
  role: String;
}