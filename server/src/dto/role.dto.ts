import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewRoleDto {
  @IsNotEmpty() name: string;
  description: string;
}
