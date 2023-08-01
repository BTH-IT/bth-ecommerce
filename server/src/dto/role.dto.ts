import { IsNotEmpty } from 'class-validator';

export class ParamsRoleDto {
  @IsNotEmpty() search?: string;
}

export class CreateNewRoleDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() description?: string;
}

export class FeatureDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name: string;
}

export class RoleAndFeatureDto {
  @IsNotEmpty() feature: FeatureDto;
  @IsNotEmpty() actions: string[];
  @IsNotEmpty() isActive: boolean;
}

export class UpdateRoleDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  @IsNotEmpty() description?: string;
  @IsNotEmpty() features?: RoleAndFeatureDto[];
}

export class DeleteRoleDto {
  @IsNotEmpty() _id: string;
}
