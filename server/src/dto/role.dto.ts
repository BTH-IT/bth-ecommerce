import { IsNotEmpty } from 'class-validator';

export class ParamsRoleDto {
  @IsNotEmpty() search?: string;
}

export class CreateNewRoleDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() description?: string;
}

export class UpdateRoleDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  @IsNotEmpty() description?: string;
}

export class DeleteRoleDto {
  @IsNotEmpty() _id: string;
}
