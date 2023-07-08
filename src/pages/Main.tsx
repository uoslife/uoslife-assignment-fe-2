// import Category from '../components/Category';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LogOutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border: 1px black solid;
  background-color: gray;
  color: white;
`;

const Main = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      alert('로그아웃에 성공하셨습니다.');
    }
  };

  return (
    <Container>
      <div>로그인에 성공하셨습니다.</div>
      <LogOutButton onClick={handleLogOut}>logout</LogOutButton>
    </Container>
  );
};

export default Main;
