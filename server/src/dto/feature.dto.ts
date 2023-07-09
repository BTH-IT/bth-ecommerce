import { IsNotEmpty } from 'class-validator';

export class CreateNewFeatureDto {
  @IsNotEmpty() name: string;
}
