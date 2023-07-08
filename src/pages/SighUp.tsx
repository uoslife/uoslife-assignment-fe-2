import styled from 'styled-components';
import { signUpAPI } from '../api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const SignUp = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { name, password, email } = inputs;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSighUp = async () => {
    const { status } = await signUpAPI({
      email: inputs.email,
      password: inputs.password,
      name: inputs.name,
      role: 'customer',
      avatar: 'https://picsum.photos/640/640?r=3276',
    });

    if (status === 201) {
      console.log('성공!');
      navigate('/login');
    }
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
        <input
          placeholder="이름"
          name="name"
          value={name}
          onChange={onChange}
        />
      </form>
      <SubmitButton onClick={handleSighUp}>회원가입</SubmitButton>
    </Container>
  );
};

export default SignUp;
