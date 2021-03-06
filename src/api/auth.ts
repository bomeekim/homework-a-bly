import connection from '@/api/index';

interface ILoginRequestBody {
  email: string, // 이메일
  password: string, // 비밀번호
}

interface IValidateRequestBody {
  email: string, // 이메일
  authCode: string, // 비밀번호 재설정 인증 코드
  issueToken: string, // 인증 코드 발급 요청 토큰
}

interface IChangePasswordRequestBody {
  email: string, // 이메일
  confirmToken: string, // 인증 코드 검증 토큰
  newPassword: string, // 새로운 비밀번호
  newPasswordConfirm: string, // 새로운 비밀번호 확인
}

const BASE_URL = 'https://ably-frontend-assignment-server.vercel.app/api';
const AUTH_API = {
  LOGIN: (payload: ILoginRequestBody) => connection.post(
    `${BASE_URL}/login`,
    payload,
  ),

  LOGOUT: () => connection.post(`${BASE_URL}/logout`),

  USER_INFO: () => connection.get(`${BASE_URL}/user`),

  REQUEST_AUTH_CODE: (email: string) => connection.get(
    `${BASE_URL}/reset-password?email=${email}`,
  ),

  VALIDATE_AUTH_CODE: (payload: IValidateRequestBody) => connection.post(
    `${BASE_URL}/reset-password`,
    payload,
  ),

  CHANGE_PASSWORD: (payload: IChangePasswordRequestBody) => connection.patch(
    `${BASE_URL}/reset-password`,
    payload,
  ),
};

export default AUTH_API;
