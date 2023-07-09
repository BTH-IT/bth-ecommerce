import { IsNotEmpty, IsPositive } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}
