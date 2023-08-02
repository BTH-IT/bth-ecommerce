import { Field, ID, InputType } from '@nestjs/graphql';
import { DateRangeInput } from './order.input';

@InputType()
export class ParamsImportOrderInput {
  @Field({ nullable: true })
  dateRange?: DateRangeInput;

  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class ImportOrderDetailInput {
  @Field()
  product: string;

  @Field()
  amount: number;

  @Field()
  price: number;
}

@InputType()
export class CreateNewImportOrderInput {
  @Field(() => [ImportOrderDetailInput])
  importProducts: [ImportOrderDetailInput];

  @Field()
  supplier: string;

  @Field()
  employee: string;

  @Field()
  totalPay: number;

  @Field()
  benefitPercent: number;
}

@InputType()
export class UpdateImportOrderInput {
  @Field(() => ID)
  _id: string;

  @Field(() => [String], { nullable: true })
  importProducts?: [string];

  @Field({ nullable: true })
  supplier?: string;

  @Field({ nullable: true })
  employee?: string;
}

@InputType()
export class DeleteImportOrderInput {
  @Field(() => ID)
  _id: string;
}
