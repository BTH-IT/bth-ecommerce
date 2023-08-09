export interface LoginFormType {
  email: string;
  password: string;
  type: string;
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

export type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type OrderFormType = {
  phone: string;
  address: string;
  fullname: string;
};
