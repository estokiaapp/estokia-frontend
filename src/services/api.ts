import { LoginData, SignupData } from '@/dto/request';
import { LoginResponse, SignupResponse } from '@/dto/response';
import axios from 'axios';

export const STORAGE_KEYS = {
  TOKEN: '@estokIApp:token',
  USER: '@estokIApp:user',
} as const;

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post('/api/users', data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/login', data);
  const responseData = response.data;
  if (responseData.token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, responseData.token);
  }
  if (responseData.user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(responseData.user));
  }

  return responseData;
};

export default api;