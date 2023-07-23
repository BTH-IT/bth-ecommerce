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
  };
  updatedAt: Date;
  createdAt: Date;
}
