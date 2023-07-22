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

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbUrl?: string;

  @Field({ nullable: true })
  isShow?: boolean;
}

@InputType()
export class DeleteBannerInput {
  @Field(() => ID)
  _id: string;
}
