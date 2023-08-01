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
export class FeatureInput {
  @Field()
  _id: string;

  @Field()
  name: string;
}

@InputType()
export class RoleAndFeatureInput {
  @Field()
  feature: FeatureInput;

  @Field(() => [String])
  actions: [string];

  @Field()
  isActive: boolean;
}

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [RoleAndFeatureInput], { nullable: true })
  features?: [RoleAndFeatureInput];
}

@InputType()
export class DeleteRoleInput {
  @Field(() => ID)
  _id: string;
}
