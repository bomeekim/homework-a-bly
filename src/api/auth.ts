import connection from '@/api/index';

interface LOGIN_REQUEST_BODY {
  email: string,
  password: string,
}

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app';
const AUTH_API = {
  LOGIN: (payload: LOGIN_REQUEST_BODY) => connection.post(
    `${BASE_URL}/api/login`,
    payload,
  ),
};

export default AUTH_API;