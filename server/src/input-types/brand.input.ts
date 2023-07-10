import { Field, ID, InputType } from '@nestjs/graphql';

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

  @Field()
  name?: string;

  @Field()
  thumbUrl?: string;

  @Field()
  iconUrl?: string;
}

@InputType()
export class DeleteBrandInput {
  @Field(() => ID)
  _id: string;
}
