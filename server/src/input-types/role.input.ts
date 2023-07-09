import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateNewRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  _id: string;

  @Field()
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class DeleteRoleInput {
  @Field(() => ID)
  _id: string;
}
