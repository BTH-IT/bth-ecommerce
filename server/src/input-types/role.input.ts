import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ParamsRoleInput {
  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class CreateNewRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class DeleteRoleInput {
  @Field(() => ID)
  _id: string;
}
