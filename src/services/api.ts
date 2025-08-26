import { SignupData } from '@/dto/requests';
import { SignupResponse } from '@/dto/responses';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post('/api/users', data);
  return response.data;
};

export default api;