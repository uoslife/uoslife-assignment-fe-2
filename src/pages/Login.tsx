import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInAPI } from '../api/auth';

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleLogIn = async () => {
    const response = await logInAPI({
      email: inputs.email,
      password: inputs.password,
    });

    const { access_token, refresh_token } = await response.json();

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    navigate('/main');
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate('/main');
  }, []);

  return (
    <Container>
      <form>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChange}
        />
      </form>
      <SubmitButton onClick={handleLogIn}>로그인</SubmitButton>
    </Container>
  );
};

export default Login;
