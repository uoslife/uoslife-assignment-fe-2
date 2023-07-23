import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../api/auth';
import { AuthenticationContext } from '../context/AuthentificationContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border: 1px black solid;
  background-color: gray;
  color: white;
`;

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { password, email } = inputs;
  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleLogIn = async () => {
    try {
      const response = await logIn({
        email: inputs.email,
        password: inputs.password,
      });
      const { access_token, refresh_token } = await response.json();

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      navigate('/main');
    } catch (e) {
      alert('로그인 항목을 양식에 맞게 모두 입력해주세요!');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate('/main');
    // 토큰이 존재할 시, main으로 라우팅
  }, []);

  return (
    <Container>
      <form>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        />
      </form>
      <SubmitButton onClick={() => login(inputs.email, inputs.password)}>
        로그인
      </SubmitButton>
    </Container>
  );
};

export default Login;
