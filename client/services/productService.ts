import axios from 'axios';

const productService = {
  getAll(params = '') {
    const url = '/products';
    return axios.get(url, { params });
  },
  getAllWithParams(params: any) {
    const url = '/products';
    return axios.get(url, { params });
  },
  getById(id: string) {
    const url = `/products/${id}`;
    return axios.get(url);
  },
  add(data: any) {
    const url = '/products';
    return axios.post(url, data);
  },
  update(data: any) {
    const url = `/products/${data['ma_san_pham']}`;
    return axios.patch(url, data);
  },
  remove(id: string) {
    const url = `/products/${id}`;
    return axios.delete(url);
  },
};

export default productService;
