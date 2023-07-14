import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { loginReq } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

  const auth = useContext(AuthContext);

  const onSubmitLogin = useCallback(
    async (email: string, password: string) => {
      if (email === '' || password === '') alert('비어있는 필드가 존재합니다.');
      else {
        try {
          if ((await loginReq(email, password)).ok) {
            alert('로그인 성공!');
            auth.login();
          } else throw new Error();
        } catch (error) {
          alert('로그인 실패!');
        }
      }
    },
    [auth],
  );

  useEffect(() => {
    if (auth.isLogin) navigate('/main');
  }, [auth, navigate]);

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmitLogin(email, password);
        }}
      >
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
