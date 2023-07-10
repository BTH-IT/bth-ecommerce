import { IsNotEmpty } from 'class-validator';

export class CreateNewTypeDto {
  @IsNotEmpty() name: string;
}

export class UpdateTypeDto {
  @IsNotEmpty() _id: string;
  @IsNotEmpty() name?: string;
}

export class DeleteTypeDto {
  @IsNotEmpty() _id: string;
}
