import { ProductType } from './product';

export interface ImportOrderType {
  _id: string;
  employee: {
    _id: string;
    name: string;
  };
  supplier: {
    _id: string;
    name: string;
  };
  importProducts: {
    product: ProductType;
    amount: number;
    price: number;
  }[];
  totalPay: number;
  benefitPercent: number;
  updatedAt: Date;
  createdAt: Date;
}
