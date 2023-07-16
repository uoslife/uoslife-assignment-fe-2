// import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { checkLoggedIn } from '../api';
import { LoginContext } from '../App';

const Main = () => {
  const setIslogin = useContext(LoginContext);
  const navigate = useNavigate();

  // 로그아웃 기능
  const logout = () => {
    setIslogin(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const accessToken = localStorage.getItem('access_token');

  //비로그인 상태 유지 기능
  useEffect(() => {
    const restrictAccessToLogin = async () => {
      if (!accessToken && !(await checkLoggedIn())) {
        alert('메인 페이지 접근 불가');
        navigate('/');
      }
    };
    restrictAccessToLogin();
  });

  return (
    <>
    {await checkLoggedIn()==='401'? <StayLoggedIn/>: }
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Main;
