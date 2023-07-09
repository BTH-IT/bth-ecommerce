import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateNewRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
