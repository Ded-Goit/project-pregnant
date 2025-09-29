import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  const cookieData = await cookies();

  try {
    const { data } = await api.post(
      '/auth/logout',
      {},
      {
        headers: { Cookie: cookieData.toString() },
      }
    );

    cookieData.delete('accessToken');
    cookieData.delete('refreshToken');

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 401 });
  }
}
