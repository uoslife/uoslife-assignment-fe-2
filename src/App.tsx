import GlobalStyle from './GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import SighUp from './pages/SighUp';
import { AuthenticationContextProvider } from './context/AuthentificationContext';

const App = () => {
  return (
    <AuthenticationContextProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SighUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </AuthenticationContextProvider>
  );
};

export default App;
