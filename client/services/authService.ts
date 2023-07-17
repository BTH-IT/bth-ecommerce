import axios from 'axios';

const authService = {
  login(data: any) {
    const url = '/auth/login';
    return axios.post('http://localhost:5000' + url, data);
  },
  register(data: any) {
    const url = `/auth/register`;
    return axios.post('http://localhost:5000' + url, data);
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
