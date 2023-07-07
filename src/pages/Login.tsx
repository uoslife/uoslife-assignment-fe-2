import { useCallback, useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      if (isLoggedIn) {
        alert('이미로그인되어있음');
        navigate('/main');
      }
    };

    checkLoggedIn();
  }, []);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );

  const login = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const login = async () => {
        try {
          const json = await API.post('auth/login', {
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': `application/json`,
            },
          }).json();

          // any는 임시방편
          const { access_token, refresh_token } = json as any;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          console.log('Login Complete!');

          navigate('/main');
        } catch (error) {
          console.log(error);

          console.log('Login Failed!');
        }
      };

      login();
    },
    [email, password],
  );

  return (
    <>
      <form onSubmit={login}>
        <input
          value={email}
          onChange={onChangeEmail}
          type="email"
          placeholder="email"
        />
        <input
          value={password}
          onChange={onChangePassword}
          type="password"
          placeholder="password"
        />
        <button type="submit" />
      </form>
    </>
  );
};

export default Login;
