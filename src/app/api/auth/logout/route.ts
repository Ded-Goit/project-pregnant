import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { AxiosError } from 'axios';

export async function POST() {
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  console.log('11111111111111111111111111111', accessToken);

  try {
    await api.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    cookieData.delete('accessToken');
    cookieData.delete('refreshToken');
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      return NextResponse.json(err.response.data, {
        status: err.response.status,
      });
    }
  }
  return NextResponse.json({ error: 666 });
}
