import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewWarrantyInput {
  @Field()
  productDetail: string;

  @Field()
  product: string;

  @Field()
  warrantyYear: number;
}

@InputType()
export class UpdateWarrantyInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  productDetail?: string;

  @Field({ nullable: true })
  product?: string;

  @Field({ nullable: true })
  warrantyYear?: number;
}

@InputType()
export class DeleteWarrantyInput {
  @Field(() => ID)
  _id: string;
}
