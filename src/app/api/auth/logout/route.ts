import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  try {
    const cookieData = await cookies();
    const accessToken = cookieData.get('accessToken')?.value;

    await api.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    cookieData.delete('accessToken');
    cookieData.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (er) {
    console.log(er.message);
  }
}
