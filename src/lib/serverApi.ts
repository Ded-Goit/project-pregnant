import { cookies } from 'next/headers';
import { nextServer } from './api';
import { RefreshResponse, User } from './clientApi';

nextServer.interceptors.request.use(async (config) => {
  const cookieData = await cookies();
  const accessToken = cookieData;
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Cookie = cookieData.toString();
  }
  return config;
});

export const refreshServer = async () => {
  const response = await nextServer.post<RefreshResponse>('/auth/refresh');
  return response;
};

export const getServerMe = async () => {
  const { data } = await nextServer<User>('/users/currentUser');
  return data;
};
