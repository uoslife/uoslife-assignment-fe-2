import GlobalStyle from './GlobalStyle';
import { useState, createContext, useCallback, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import { readTodo } from './api/todo';

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

  useEffect(() => {
    const a = async () => {
      console.log(await (await readTodo()).json());
    };
    a();
  }, []);

  return (
    <>
      <GlobalStyle />
      <LoginContext.Provider value={{ islogin, setIslogin: loginHandler }}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </>
  );
};

export default App;
