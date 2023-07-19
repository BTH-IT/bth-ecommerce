import { RegisterFormType } from './../types/form.d';
import { LoginFormType } from '@/types/form';
import axios from 'axios';

const authService = {
  login(data: LoginFormType) {
    const url = '/auth/login';
    return axios.post('http://localhost:5000' + url, data);
  },
  register(data: RegisterFormType) {
    const url = `/auth/register`;
    return axios.post('http://localhost:5000' + url, data);
  },
  getProfile(accessToken: string) {
    const url = `/auth/profile`;
    return axios.get('http://localhost:5000' + url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  refresh(refreshToken: string) {
    const url = `/auth/refresh-token`;
    return axios.get('http://localhost:5000' + url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  },
};

export default authService;
