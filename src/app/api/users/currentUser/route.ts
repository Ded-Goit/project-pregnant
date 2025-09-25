import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieData = await cookies();

  try {
    const { data } = await api('/users/currentUser', {
      headers: { Cookie: cookieData.toString() },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 401, message: 'Помилка' });
  }
}
