import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewAccountInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ defaultValue: 'default' })
  type?: string;
}

@InputType()
export class UpdateAccountInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: string;
}

@InputType()
export class DeleteAccountInput {
  @Field(() => ID)
  _id: string;
}
