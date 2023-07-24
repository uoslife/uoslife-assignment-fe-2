import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getProfile, logIn, updateRefreshToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: () => void;
  // handleGetProfile: () => Promise<void>;
};
export const AuthenticationContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  handleSignUp: () => {},
  // handleGetProfile: async () => {},
});

export const AuthenticationContextProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // const handleGetProfile = async () => {
  //   const accessToken = localStorage.getItem('access_token');
  //   try {
  //     const response = await getProfile(accessToken!);
  //     return await response.json();
  //   } catch (e: any) {
  //     return e.response.status;
  //   }
  // };

  const handleUpdateRefreshToken = async (refreshToken: string) => {
    const res = await updateRefreshToken({ refreshToken });
    const { access_token, refresh_token } = await res.json();

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await logIn({
        email: email,
        password: password,
      });
      const { access_token, refresh_token } = await response.json();

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return navigate('/main');
    } catch (e) {
      alert('로그인 항목을 양식에 맞게 모두 입력해주세요!');
    }
  };

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (!localStorage.getItem('access_token')) {
      alert('로그아웃에 성공하셨습니다.');
      return navigate('/login');
    }
  }, [isAuthenticated, setIsAuthenticated]);

  const handleSignUp = () => {
    localStorage.setItem('isSignUp', String(true));
  };

  const initialize = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const signUpValue = localStorage.getItem('isSignUp');

    // 회원가입이 안되있을 경우 회원가입 창으로 라우팅
    if (!signUpValue) return navigate('./');

    // accessToken이 있는 경우 불필요한 로직 실행 중지.
    if (accessToken) return;

    // refreshToken이 없으면 login, 있으면 accessToken 발급
    if (!refreshToken) return navigate('./login');
    await handleUpdateRefreshToken(refreshToken!);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
        handleLogout,
        handleSignUp,
        // handleGetProfile,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
