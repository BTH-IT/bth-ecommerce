import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateNewRoleDto {
  @IsNotEmpty() name: String;
  description: String;
}