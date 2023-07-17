import ky, { KyResponse } from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const { access_token, refresh_token } = await response.json();

        if (access_token) localStorage.setItem('access_token', access_token);
        if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
      },
    ],
  },
});

export const loginReq = async (email: string, password: string) => {
  return await API.post('auth/login', { json: { email, password } });
};

export const checkLoggedIn = async () => {
  if ((await accessTokenReq()).ok) return true;
  else if ((await refreshTokenReq()).ok && (await accessTokenReq()).ok)
    return true;

  return false;
};

const accessTokenReq = async () => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken)
    return await API.get('auth/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  return new Response(JSON.stringify({ message: '토큰이 업음' }), {
    status: 401,
  });
};

const refreshTokenReq = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (refreshToken)
    return await API.post('auth/refresh-token', {
      json: { refreshToken },
    });
  return new Response(JSON.stringify({ message: '토큰이 업음' }), {
    status: 401,
  });
};

export const TODO_API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://todo-assignment-cms.fly.dev/api/todos',
});

export const getTodos: () => Promise<KyResponse> = async () => {
  return ky.get('');
};

export const postTodo: (input: string) => Promise<KyResponse> = async (
  input: string,
) => {
  return ky.post('', { json: { data: { todo: input } } });
};

export const putTodo: (
  input: string,
  id: number,
) => Promise<KyResponse> = async (input: string, id: number) => {
  return ky.put(`${id}`, { json: { data: { todo: input } } });
};

export const deleteTodo: (id: number) => Promise<KyResponse> = async (
  id: number,
) => {
  return ky.delete(`${id}`);
};
