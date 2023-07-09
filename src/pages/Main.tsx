// import Category from '../components/Category';

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let isLoggedIn = false;

      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        const res = await API.get('auth/profile', {
          headers: { Authorization: 'Bearer ' + accessToken },
        });

        if (res.ok) {
          isLoggedIn = true;
        }
        // 만료 case: access_token 재발급 시도
        else if (res.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');

          if (refreshToken) {
            const res = await API.get('auth/refresh-token', {
              headers: { refreshToken },
            });

            if (res.ok) {
              isLoggedIn = true;
            }
          }
        }
      }

      if (!isLoggedIn) {
        alert('로그인안됨');
        navigate('/');
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  }, [navigate]);

  return (
    <>
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Login;
