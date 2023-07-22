import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewTypeInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateTypeInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class DeleteTypeInput {
  @Field(() => ID)
  _id: string;
}
