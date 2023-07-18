import ky from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

export const TODO_API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://todo-assignment-cms.fly.dev/api/todos',
});

// 로그인 상태 유무 점검
export const checkLoggedIn = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    try {
      const response = await API.get('auth/profile', {
        headers: { Authorizastion: 'Bearer ' + accessToken },
      });
      if (response.status === 401) {
        stayLoggedIn();
        return '401';
      }
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

// acess token 만료시 refresh token을 받아와 로그인 상태를 유지
export const stayLoggedIn = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await API.post('auth/refresh-token', {
        body: JSON.stringify({ refreshToken }),
      });
      const access_token = (await response.json()) as any;
      response.headers.set('Authorization', `token ${access_token}`);
    } catch (error) {
      console.log(error);
    }
  }
};
