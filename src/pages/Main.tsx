// import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API, StayLoggedIn } from '../api';

const Login = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const accessToken = localStorage.getItem('access_token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const LoggedIn = async () => {
      if (accessToken) {
        const response = await API.get('auth/profile', {
          headers: { Authorization: 'Bearer ' + accessToken },
        });
        if (response.status === 401) {
          StayLoggedIn();
        }
        if (response.ok) {
          setIsLoggedIn(true);
        }
      }
    };
    if (!accessToken && !isLoggedIn) {
      alert('페이지 접근 불가');
      navigate('/');
    }

    LoggedIn();
  });

  return (
    <>
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Login;
