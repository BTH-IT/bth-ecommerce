export interface LoginFormType {
  email: string;
  password: string;
}

export type RegisterFormType = LoginFormType & {
  confirmPassword: string;
};
