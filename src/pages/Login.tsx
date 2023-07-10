import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, StayLoggedIn } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

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
    if (accessToken && isLoggedIn) {
      alert('페이지 접근 불가');
      navigate('/main');
    }

    LoggedIn();
  });

  const login = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login = async () => {
        try {
          const response = await API.post('auth/login', {
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const { access_token, refresh_token } =
            (await response.json()) as any;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          navigate('/main');
        } catch (error) {
          console.log(error);
        }
      };

      login();
    },
    [email, password, navigate],
  );

  return (
    <>
      <form onSubmit={login}>
        <input type="email" placeholder="email" onChange={emailChange} />
        <input
          type="password"
          placeholder="password"
          onChange={passwordChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
