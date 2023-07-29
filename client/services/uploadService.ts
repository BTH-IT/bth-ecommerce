import axios from 'axios';

const uploadService = {
  uploadSingle(data: File) {
    const url = '/upload/single';
    const formData = new FormData();
    formData.append('file', data);

    return axios.post('http://localhost:5000' + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  uploadMultiple(data: File[]) {
    const url = `/upload/multiple`;
    const formData = new FormData();
    console.log(data);

    data.forEach((file) => formData.append('file', file));

    return axios.post('http://localhost:5000' + url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },
  deleteSingle(data: { filename: string; publicId: string }) {
    const url = `/upload/single/${data.filename}/${data.publicId}`;
    return axios.delete('http://localhost:5000' + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  },

  deleteMultiple(data: { filename: string; publicId: string }[]) {
    return data.forEach((item) => {
      const url = `/upload/single/${item.filename}/${item.publicId}`;
      return axios.delete('http://localhost:5000' + url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    });
  },
};

export default uploadService;
