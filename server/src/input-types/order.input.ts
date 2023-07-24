import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ParamsOrderInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  type?: string;
}

@InputType()
export class OrderDetailInput {
  @Field()
  product: string;

  @Field()
  amount: number;

  @Field()
  price: number;
}

@InputType()
export class CreateNewOrderInput {
  @Field(() => [OrderDetailInput])
  boughtProducts: [OrderDetailInput];

  @Field()
  user: string;

  @Field({ nullable: true })
  employee?: string;

  @Field()
  purchaseForm: string;
}

@InputType()
export class UpdateOrderInput {
  @Field(() => ID)
  _id: string;

  @Field(() => [String], { nullable: true })
  boughtProducts?: [string];

  @Field({ nullable: true })
  user?: string;

  @Field({ nullable: true })
  employee?: string;

  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  isPaid?: boolean;
}

@InputType()
export class DeleteOrderInput {
  @Field(() => ID)
  _id: string;
}
