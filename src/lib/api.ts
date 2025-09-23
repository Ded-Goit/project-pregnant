import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  gender: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const register = async (payload: RegisterRequest) => {
  const { data } = await nextServer.post<User>('/auth/register', payload);
  return data;
};

export const refresh = async () => {
  const { data } = await nextServer<RefreshResponse>('/auth/refresh');
  return data.accessToken;
};

export const getMe = async () => {
  const { data } = await nextServer<User>('/auth/me');
  return data;
};

export const login = async (payload: LoginRequest) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload);
  return data;
};

export default nextServer;
