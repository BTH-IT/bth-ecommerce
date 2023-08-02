import { RoleType } from './role';

export interface AccountType {
  _id: string;
  email: string;
  picture: string;
  role: RoleType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
