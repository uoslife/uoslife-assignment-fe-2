import API from '../api';

const isLoggedIn: () => Promise<boolean> = async () => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    const res = await API.get('auth/profile', {
      headers: { Authorization: 'Bearer ' + accessToken },
    });

    if (res.ok) {
      return true;
    }
    // 만료 case: access_token 재발급 시도
    else if (res.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const res = await API.get('auth/refresh-token', {
          headers: { refreshToken },
        });

        if (res.ok) {
          return true;
        }
      }
    }
  }

  return false;
};

export default isLoggedIn;
