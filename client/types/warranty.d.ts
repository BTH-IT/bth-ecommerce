import { UserType } from './auth';
import { ProductType } from './product';

export interface WarrantyType {
  _id: string;
  productDetail: string;
  product: ProductType;
  user: UserType;
  warrantyYear: number;
  createdAt: Date;
  updatedAt: Date;
}
