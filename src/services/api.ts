import { LoginData, SignupData } from '@/dto/request';
import { LoginResponse, SignupResponse } from '@/dto/response';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post('/api/users', data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/login', data);
  return response.data;
};

export default api;