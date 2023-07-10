import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewUserInput {
  @Field()
  fullname: string;

  @Field()
  gender: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  account?: string;

  @Field()
  type: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  _id: string;

  @Field()
  fullname?: string;

  @Field()
  gender?: string;

  @Field()
  age?: number;

  @Field({ nullable: true })
  account?: string;

  @Field()
  type?: string;
}

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  _id: string;
}
