export interface LoginFormType {
  email: string;
  password: string;
}

export type RegisterFormType = LoginFormType & {
  fullname: string;
  gender: string;
  phone: string;
  address: string;
  birthYear: number;
  confirmPassword: string;
};
