import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import { refreshTokenAPI } from './auth';

const afterResponse: AfterResponseHook = async (request, options, response) => {
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');

    const res = await refreshTokenAPI({ refreshToken });
    const { access_token, refresh_token } = await res.json();

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }
};
const beforeRequest: BeforeRequestHook = request => {
  const token = localStorage.getItem('token');
  if (token) request.headers.set('Authorization', `Bearer ${token}`);
  console.log(token, request.headers);
};
export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
  hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
});

export default API;
