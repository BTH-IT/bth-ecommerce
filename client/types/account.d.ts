export interface AccountType {
  _id: string;
  email: string;
  picture: string;
  role: {
    _id: string;
    name: string;
    description: string;
    features: {
      feature: {
        _id: string;
        name: string;
        isActive: boolean;
      };
      actions: [string];
    }[];
    isActive: boolean;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
