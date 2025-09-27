import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

export async function GET() {
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;

  try {
    const { data } = await api('/users/currentUser', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      return NextResponse.json(err.response.data, {
        status: err.response.status,
      });
    }
  }
}
