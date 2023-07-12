import ky from 'ky';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

export const StayLoggedIn = async () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await API.post('auth/refresh-token', {
        body: JSON.stringify({ refreshToken }),
      });
      const { access_token, refresh_token } = (await response.json()) as any;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      navigate('/main');
    } catch (error) {
      console.log(error);
    }
  }
};



