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
export interface Emotion {
  _id: string;
  title: string;
}

export interface Diary {
  _id?: string;
  title: string;
  emotions: Emotion[];
  descr: string;
  createdAt: string;
}

export interface CreateDiaryResponse {
  data: {
    data: {
      _id: string;
      title: string;
      emotions: Emotion[];
      descr: string;
      createdAt: string;
    };
  };
}

export interface UpdateDiaryResponse {
  data: {
    _id: string;
    title: string;
    emotions: Emotion[];
    descr: string;
    createdAt: string;
  };
}

export interface getDiaryResponse {
  data: {
    data: Diary[];
  };
}

export interface getDiaryByIdResponse {
  data: Diary;
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
  photo: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  dueDate?: string;
  onboardingCompleted?: boolean;
}

export interface getUserResponse {
  data: User;
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
  const { data } = await nextServer<getUserResponse>('/users/currentUser');
  return data.data;
};

export const login = async (payload: LoginRequest) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const createDiary = async (payload: CreateDiaryRequest) => {
  const { data } = await nextServer.post<CreateDiaryResponse>(
    '/diaries',
    payload
  );
  return data;
};

export const getDiaries = async () => {
  const { data } = await nextServer.get<getDiaryResponse>('/diaries');
  return data;
};

export const delDiaries = async (id: string | undefined) => {
  const { data } = await nextServer.delete<getDiaryResponse>(`/diaries/${id}`);
  return data;
};

export const GetDiaryRec = async (id: string | undefined) => {
  const { data } = await nextServer.get<getDiaryByIdResponse>(`/diaries/${id}`);
  return data;
};

export const updateDiary = async (
  id: string | undefined,
  payload: CreateDiaryRequest
) => {
  const { data } = await nextServer.patch<UpdateDiaryResponse>(
    `/diaries/${id}`,
    payload
  );
  return data;
};

export const getEmotions = async () => {
  const { data } = await nextServer.get<EmotionsResponse>('/emotions');
  return data;
};

export const updateUserData = async (id: string, data: FormData) => {
  const res = await nextServer.patch(`/users/updateUserData/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
