import { ProductType } from './product';

export interface WarrantyType {
  _id: string;
  productDetail: string;
  product: ProductType;
  warrantyYear: number;
  createdAt: Date;
  updatedAt: Date;
}
