import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewBannerInput {
  @Field()
  name: string;

  @Field({ defaultValue: '' })
  description?: string;

  @Field()
  thumbUrl: string;
}

@InputType()
export class UpdateBannerInput {
  @Field(() => ID)
  _id: string;

  @Field()
  name?: string;

  @Field()
  description?: string;

  @Field()
  thumbUrl?: string;

  @Field()
  isShow?: boolean;
}

@InputType()
export class DeleteBannerInput {
  @Field(() => ID)
  _id: string;
}
