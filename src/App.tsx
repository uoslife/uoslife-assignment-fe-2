import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';

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

const App = () => {
  const [islogin, setIsLogin] = useState(false);
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
