import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ParamsBrandInput {
  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class CreateNewBrandInput {
  @Field()
  name: string;

  @Field()
  thumbUrl: string;

  @Field()
  iconUrl: string;
}

@InputType()
export class UpdateBrandInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  thumbUrl?: string;

  @Field({ nullable: true })
  iconUrl?: string;
}

@InputType()
export class DeleteBrandInput {
  @Field(() => ID)
  _id: string;
}
