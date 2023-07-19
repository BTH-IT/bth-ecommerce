import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateNewUserDto {
  @IsNotEmpty() fullname: string;
  gender?: string;

  @IsPositive()
  birthYear?: number;

  phone?: string;

  address?: string;

  account?: string;
}

export class UpdateUserDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() fullname?: string;
  @IsNotEmpty() gender?: string;

  @IsNotEmpty()
  @IsPositive()
  birthYear?: number;

  @IsNotEmpty()
  phone?: string;

  @IsNotEmpty()
  address?: string;

  @IsNotEmpty() account?: string;
  @IsNotEmpty() type?: string;
}

export class DeleteUserDto {
  @IsNotEmpty() _id: string;
}
