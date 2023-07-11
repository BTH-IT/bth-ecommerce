import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewImportOrderInput {
  @Field(() => [String])
  importedProducts: [string];

  @Field()
  supplier: string;

  @Field()
  employee: string;
}

@InputType()
export class UpdateImportOrderInput {
  @Field(() => ID)
  _id: string;

  @Field(() => [String])
  importedProducts?: [string];

  @Field()
  supplier?: string;

  @Field()
  employee?: string;
}

@InputType()
export class DeleteImportOrderInput {
  @Field(() => ID)
  _id: string;
}
