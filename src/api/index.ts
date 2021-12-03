import axios from 'axios';
import { ABLY_ACCESS_TOKEN } from '@/constants';

const connection = axios.create();
connection.defaults.headers.common['Content-Type'] = 'application/json';
connection.defaults.responseType = 'json';

const token = localStorage.getItem(ABLY_ACCESS_TOKEN);

if (token) {
  connection.defaults.headers.common.Authorization = `Bearer ${token}`;
}

connection.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    return { data, status };
  },
  (err) => {
    const { data: { error }, status } = err.response;

    switch (status) {
      case 400:
        break;
      case 401:
        break;
      case 404:
        break;
      case 500:
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default connection;
