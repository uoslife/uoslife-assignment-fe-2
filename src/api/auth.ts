import API from './index';

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type LogInRequest = {
  email: string;
  password: string;
};

const signUp = async (data: SignUpRequest): Promise<Response> => {
  return API.post('users', { json: data });
};

const logIn = async (data: LogInRequest): Promise<Response> => {
  return API.post('auth/login', { json: data });
};

const updateRefreshToken = async (data: object | null): Promise<Response> => {
  return API.post('auth/refresh-token', { json: data });
};

export { signUp, logIn, updateRefreshToken };
