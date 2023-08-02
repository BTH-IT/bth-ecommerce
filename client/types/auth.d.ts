import { AccountType } from './account';
import { UserGenreType } from './user-type';

export interface LoginResponseType {
  newAccount:
    | {
        _id: string;
        email: string;
        role: string;
        type: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
      }
    | {};
  user:
    | {
        _id: string;
        fullname: string;
        gender: string;
        birthYear: number;
        phone: string;
        address: string;
        account: string;
        type: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
      }
    | {};
  accessToken: string;
  refreshToken: string;
}

export interface UserType {
  _id: string;
  fullname: string;
  birthYear: number;
  gender: string;
  phone: string;
  address: string;
  account: AccountType;
  type: UserGenreType;
  createdAt: Date;
  updatedAt: Date;
}
