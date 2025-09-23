import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST() {
  const cookieData = await cookies();
  const refreshToken = cookieData.get('refreshToken')?.value;

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
    } catch {
      return NextResponse.json({ status: 401, message: 'Не авторизовано' });
    }
  }

  return NextResponse.json({ status: 401, message: 'Не авторизовано' });
}
