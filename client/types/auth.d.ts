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
  account: {
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
        };
        actions: [string];
      };
    };
  };
  type: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
