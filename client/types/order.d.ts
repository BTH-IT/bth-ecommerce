export interface OrderType {
  _id: string;
  employee: {
    _id: string;
  };
  user: {
    _id: string;
  };
  boughtProducts: {
    product: {
      _id: string;
      productName: string;
    };
    amount: number;
    price: number;
  }[];
  status: string;
  purchaseForm: string;
  isPaid: boolean;
  totalPay: number;
  phone: string;
  fullname: string;
  address: string;
  updatedAt: Date;
  createdAt: Date;
}
