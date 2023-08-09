import { IsNotEmpty, IsPositive } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() type: string;
}

export class RegisterDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() gender: string;
  @IsNotEmpty() address: string;
  @IsNotEmpty() phone: string;
  @IsNotEmpty() birthYear: number;
}
