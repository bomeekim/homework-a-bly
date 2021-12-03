/**
 * Axios Header 에 Auth Token을 설정한다.
 * @param token Auth Token
 */
import connection from '@/api';

// eslint-disable-next-line import/prefer-default-export
export const setAxiosHeaderAuthToken = (token: string) => {
  if (!token) return;

  connection.defaults.headers.common.Authorization = `Bearer ${token}`;
};
