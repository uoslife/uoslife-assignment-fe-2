// import Category from '../components/Category';

import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    const checkLoggedIn = async () => {
      let isLoggedIn = false;

      if (accessToken) {
        const res = await API.get('auth/profile', {
          headers: { Authorization: 'Bearer ' + accessToken },
        });

        if (res.status !== 401) {
          isLoggedIn = true;
        }
      }

      if (!isLoggedIn) {
        alert('로그인안됨');
        navigate('/');
      }
    };

    checkLoggedIn();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  }, []);

  return (
    <>
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Login;
