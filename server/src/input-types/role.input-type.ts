import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateNewRoleInput {
  @Field()
  name: String;

  @Field({nullable: true})
  description: String;
}