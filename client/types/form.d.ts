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

export type InformationFormType = {
  email: string;
  fullname: string;
  gender: string;
  phone: string;
  address: string;
  birthYear: number;
  avatar: any;
};
