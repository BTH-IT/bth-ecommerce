import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewUserDto {
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() gender: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsNotEmpty() account?: string;
  @IsNotEmpty() type: string;
}

export class UpdateUserDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() fullname?: string;
  @IsNotEmpty() gender?: string;

  @IsNotEmpty()
  @IsPositive()
  age?: number;
  @IsNotEmpty() account?: string;
  @IsNotEmpty() type?: string;
}

export class DeleteUserDto {
  @IsNotEmpty() _id: string;
}
