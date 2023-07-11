import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewOrderInput {
  @Field(() => [String])
  boughtProducts: [string];

  @Field()
  user: string;

  @Field()
  employee: string;

  @Field()
  purchaseForm: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => ID)
  _id: string;

  @Field(() => [String])
  boughtProducts?: [string];

  @Field()
  user?: string;

  @Field()
  employee?: string;

  @Field()
  purchaseFrom?: string;
}

@InputType()
export class DeleteOrderInput {
  @Field(() => ID)
  _id: string;
}
