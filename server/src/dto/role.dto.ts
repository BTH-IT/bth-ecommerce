import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewRoleDto {
  @IsNotEmpty() name: string;
  description: string;
}

export class UpdateRoleDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
  description?: string;
}

export class DeleteRoleDto {
  @IsNotEmpty() _id: string;
}
