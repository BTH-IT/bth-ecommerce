import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewSupplierInput {
  @Field()
  name: string;

  @Field()
  phoneNum: string;

  @Field()
  address: string;
}

@InputType()
export class UpdateSupplierInput {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phoneNum?: string;

  @Field({ nullable: true })
  address?: string;
}

@InputType()
export class DeleteSupplierInput {
  @Field(() => ID)
  _id: string;
}
