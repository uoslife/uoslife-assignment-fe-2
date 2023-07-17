import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { TodoList } from '../components/Todo';

const Main = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    auth.logout();

    navigate('/');
  }, [navigate, auth]);

  if (!auth.isLogin) navigate('/');

  return (
    <>
      <button type="button" onClick={logout}>
        <TodoList />
        logout
      </button>
    </>
  );
};

export default Main;
