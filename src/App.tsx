import GlobalStyle from './GlobalStyle';
import { useState, createContext, useCallback } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';

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

export const LoginContext = createContext({
  islogin: false,
  setIslogin: (islogin: boolean) => {},
});

const App = () => {
  const [islogin, setIslogin] = useState(false);
  const loginHandler = useCallback(
    (islogin: boolean) => {
      setIslogin(islogin);
    },
    [setIslogin],
  );
  return (
    <>
      <GlobalStyle />
      <LoginContext.Provider value={{ islogin, loginHandler }}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </>
  );
};

export default App;
