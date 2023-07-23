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
  isSignUp: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  handleGetProfile: (accessToken: string) => Promise<void>;
  handleSignUp: () => void;
};
export const AuthenticationContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isSignUp: false,
  setIsSignUp: () => {},
  login: async () => {},
  logout: async () => {},
  handleGetProfile: async () => {},
  handleSignUp: () => {},
});

export const AuthenticationContextProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleGetProfile = async (accessToken: string) => {
    try {
      const response = await getProfile(accessToken);
      return await response.json();
    } catch (e: any) {
      return e.response.status;
    }
  };

  const handleUpdateRefreshToken = async (refreshToken: string) => {
    const res = await updateRefreshToken({ refreshToken });
    const { access_token, refresh_token } = await res.json();

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const initialize = useCallback(async () => {
    localStorage.setItem('isSingUp', String(isSignUp));
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const signUpValue = localStorage.getItem('isSignUp');

    console.log(signUpValue);
    if (!signUpValue) return navigate('./');

    // accessToken이 있는 경우 불필요한 로직 실행 중지.
    if (accessToken) return;

    // refreshToken이 없으면 login, 있으면 accessToken 발급
    if (!refreshToken) return navigate('./login');
    await handleUpdateRefreshToken(refreshToken!);
  }, [isAuthenticated, setIsAuthenticated]);

  const login = useCallback(async (email: string, password: string) => {
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
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (!localStorage.getItem('access_token')) {
      alert('로그아웃에 성공하셨습니다.');
      return navigate('/login');
    }
  }, []);

  const handleSignUp = () => {
    setIsSignUp(true);
    localStorage.setItem('isSingUp', String(isSignUp));
  };

  useEffect(() => {
    initialize();
  }, [isAuthenticated, setIsAuthenticated]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isSignUp,
        setIsSignUp,
        login,
        logout,
        handleGetProfile,
        handleSignUp,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
