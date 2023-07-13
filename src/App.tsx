import GlobalStyle from './GlobalStyle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { createContext, useEffect, useState } from 'react';
import { checkLoggedIn } from './api';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Main />,
  },
]);

export const AuthContext = createContext({
  isLogin: false,
  login: () => {},
  logout: () => {},
});

const App = () => {
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const 뭐라짓지 = async () => {
      try {
        const res = await checkLoggedIn();

        if (res.status !== 401) setIsLogin(true);
        else setIsLogin(false);
      } catch (err) {
        console.log(err);
      }
    };

    뭐라짓지();
  }, []);

  return (
    <>
      <GlobalStyle />
      <AuthContext.Provider
        value={{
          isLogin: islogin,
          login: () => {
            setIsLogin(true);
          },
          logout: () => {
            setIsLogin(false);
          },
        }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
};

export default App;
