import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Main = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    auth.logout();

    navigate('/');
  }, [navigate]);

  if (!auth.isLogin) navigate('/');

  return (
    <>
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Main;
