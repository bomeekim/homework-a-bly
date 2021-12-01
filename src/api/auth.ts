import connection from '@/api/index';

interface LOGIN_REQUEST_BODY {
  email: string, // 이메일
  password: string, // 비밀번호
}

interface VALIDATE_REQUEST_BODY {
  email: string, // 이메일
  authCode: string, // 비밀번호 재설정 인증 코드
  issueToken: string, // 인증 코드 발급 요청 토큰
}

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app';
const AUTH_API = {
  LOGIN: (payload: LOGIN_REQUEST_BODY) => connection.post(
    `${BASE_URL}/api/login`,
    payload,
  ),

  REQUEST_AUTH_CODE: (email: string) => connection.get(
    `${BASE_URL}/api/reset-password?email=${email}`,
  ),

  VALIDATE_AUTH_CODE: (payload: VALIDATE_REQUEST_BODY) => connection.post(
    `${BASE_URL}/api/reset-password`,
    payload,
  ),
};

export default AUTH_API;
