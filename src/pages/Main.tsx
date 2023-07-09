// import Category from '../components/Category';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        logout
      </button>
    </>
  );
};

export default Login;
