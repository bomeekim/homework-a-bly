import axios from 'axios';

const connection = axios.create();
connection.defaults.headers.common['Content-Type'] = 'application/json';
connection.defaults.responseType = 'json';

// TODO 인가가 필요한 요청인 경우 Header 에 Authorization 추가

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
