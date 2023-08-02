import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ParamsFeatureInput {
  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class CreateNewFeatureInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateFeatureInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class DeleteFeatureInput {
  @Field(() => ID)
  _id: string;
}
