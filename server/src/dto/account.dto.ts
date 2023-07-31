import { IsNotEmpty } from 'class-validator';

export class ParamsAccountDto {
  @IsNotEmpty() search?: string;
}
export class CreateNewAccountWithAvailableUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() role: string;
  @IsNotEmpty() user: string;
}

export class CreateNewAccountDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() role?: string;
  @IsNotEmpty() type?: string;
}

export class UpdateAccountDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() email?: string;
  @IsNotEmpty() picture?: string;
  @IsNotEmpty() password?: string;
  @IsNotEmpty() role?: string;
}

export class DeleteAccountDto {
  @IsNotEmpty() _id: string;
}
