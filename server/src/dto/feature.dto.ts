import { IsNotEmpty } from 'class-validator';

export class ParamsFeatureDto {
  @IsNotEmpty() search?: string;
}

export class CreateNewFeatureDto {
  @IsNotEmpty() name: string;
}

export class UpdateFeatureDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
}

export class DeleteFeatureDto {
  @IsNotEmpty() _id: string;
}
