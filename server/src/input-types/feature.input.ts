import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewFeatureInput {
  @Field()
  name: string;
}
