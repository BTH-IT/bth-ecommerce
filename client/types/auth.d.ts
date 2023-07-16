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
  accessToken: string;
  refreshToken: string;
}
