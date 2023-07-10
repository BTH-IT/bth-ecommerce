import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewAccountInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role?: string;

  @Field({ defaultValue: 'default' })
  type?: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => ID)
  _id: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  role?: string;
}

@InputType()
export class DeleteAccountInput {
  @Field(() => ID)
  _id: string;
}
