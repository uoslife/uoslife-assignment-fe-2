import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import { getProfile, updateRefreshToken } from './auth';

const afterResponse: AfterResponseHook = async (request, options, response) => {
  if (response.status === 401) {
    // 401 에러 즉, 로그인이 안되있을 경우, 토큰 재삽입
    const refreshToken = localStorage.getItem('refresh_token');

    const res = await updateRefreshToken({ refreshToken });
    const { access_token, refresh_token } = await res.json();

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }
};
const beforeRequest: BeforeRequestHook = async request => {
  const token = localStorage.getItem('token');

  if (token) request.headers.set('Authorization', `Bearer ${token}`);
};
export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
  hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
});

export default API;
