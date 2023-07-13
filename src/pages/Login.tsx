import { useCallback, useContext, useEffect, useState } from 'react';
import { loginRequest } from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

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

  const onSubmitLogin = useCallback(
    async (email: string, password: string) => {
      if (email === '' || password === '') alert('비어있는 필드가 존재합니다.');
      else {
        const res = await loginRequest(email, password);
        if (res.ok) {
          alert('로그인 성공!')!;

          auth.login();

          navigate('/main');
        } else alert('로그인 실패!');
      }
    },
    [navigate],
  );

  const auth = useContext(AuthContext);

  if (auth.isLogin) navigate('/main');

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
