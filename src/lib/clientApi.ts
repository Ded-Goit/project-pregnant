import { nextServer } from './api';

export interface Emotion {
  _id: string;
  title: string;
}

export interface EmotionsResponse {
  data: { data: Emotion[] };
}

export interface CreateDiaryRequest {
  title: string;
  emotions: string[];
  descr: string;
}

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
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshResponse {
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const register = async (payload: RegisterRequest) => {
  const { data } = await nextServer.post<User>('/auth/register', payload);
  return data;
};

export const refresh = async () => {
  const { data } = await nextServer.post<RefreshResponse>('/auth/refresh');
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer<User>('/users/currentUser');
  return data;
};

export const login = async (payload: LoginRequest) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload);
  return data;
};


export const createDiary = async (payload: CreateDiaryRequest) => {
  const { data } = await nextServer.post<CreateDiaryRequest>(
    '/diaries',
    payload
  );
  return data;
};

export const getEmotions = async () => {
  const { data } = await nextServer.get<EmotionsResponse>('/emotions');
  return data;
};