import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { AxiosError } from 'axios';

export async function POST() {
  const cookieData = await cookies();
  const accessToken = cookieData.get('accessToken')?.value;
  const refreshToken = cookieData.get('refreshToken')?.value;

  if (accessToken) {
    try {
      const response = await api.get('/users/currentUser', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return NextResponse.json(response.data);
    } catch {
      // якщо токен невалідний, падаємо далі на refresh
    }
  }

  if (refreshToken) {
    try {
      const response = await api('/auth/refresh', {
        headers: { Cookie: cookieData.toString() },
      });

      const setCookies = response.headers['set-cookie'];

      if (setCookies) {
        const cookiesArray = Array.isArray(setCookies)
          ? setCookies
          : [setCookies];

        for (const newCookieString of cookiesArray) {
          const parsedCookie = parse(newCookieString);
          const options = {
            path: parsedCookie.Path,
            maxAge: Number(parsedCookie['Max-Age']),
            expires: parsedCookie.Expires
              ? new Date(parsedCookie.Expires)
              : undefined,
            httpOnly: true,
            secure: true,
          };

          if (parsedCookie.accessToken) {
            cookieData.set('accessToken', parsedCookie.accessToken, options);
          }

          if (parsedCookie.refreshToken) {
            cookieData.set('refreshToken', parsedCookie.refreshToken, options);
          }
        }
      }

      return NextResponse.json(response.data);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        return NextResponse.json(err.response.data, {
          status: err.response.status,
        });
      }
    }
  }

  return NextResponse.json({ status: 500, message: 'Щось пішло не так' });
}
