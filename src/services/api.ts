import { LoginData, SignupData } from '@/dto/request';
import { LoginResponse, SignupResponse, User, UsersResponse } from '@/dto/response';
import axios from 'axios';

export const STORAGE_KEYS = {
  TOKEN: '@estokIApp:token',
  USER: '@estokIApp:user',
} as const;

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post('/api/users', data);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/api/users');
  return response.data;
};

export const createUser = async (userData: { name: string; email: string; password: string }): Promise<User> => {
  const response = await api.post<User>('/api/users', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: { name: string; email: string }): Promise<User> => {
  const response = await api.put<User>(`/api/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/api/users/${id}`);
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