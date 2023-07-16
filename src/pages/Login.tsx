import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, checkLoggedIn } from '../api';
import { LoginContext } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setIslogin = useContext(LoginContext);

  const navigate = useNavigate();

  // 로그인 기능
  const login = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const handleLogin = async () => {
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

          setIslogin(true);
          navigate('/main');
        } catch (error) {
          setIslogin(false);
          console.log(error);
        }
      };
      if (email === 'john@mail.com' && password === 'changeme') {
        handleLogin();
      }
    },
    [email, password, navigate, setIslogin],
  );

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const accessToken = localStorage.getItem('access_token');

  // 로그인 상태 유지 기능
  useEffect(() => {
    const restrictAccessToMain = async () => {
      if (accessToken && (await checkLoggedIn())) {
        alert('로그인 페이지 접근 불가');
        navigate('/main');
      }
    };
    restrictAccessToMain();
  });

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
