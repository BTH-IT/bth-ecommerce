import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewUserInput {
  @Field()
  fullname: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthYear?: number;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  account?: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthYear?: number;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  account?: string;

  @Field({ nullable: true })
  type?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  _id: string;
}
