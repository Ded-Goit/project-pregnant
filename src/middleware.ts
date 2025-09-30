import { refreshServer } from '@/lib/serverApi';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/journey', '/diary'];
const publicRoutes = ['/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookiesData = await cookies();
  const accessToken = cookiesData.get('accessToken')?.value;
  const refreshToken = cookiesData.get('refreshToken')?.value;

  const isPrivateRoutes = privateRoutes.some((route) =>
    route.startsWith(pathname)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoutes) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          const response = await refreshServer();
          const setCookies = response.headers['set-cookie'];

          if (setCookies) {
            const cookiesArray = Array.isArray(setCookies)
              ? setCookies
              : [setCookies];

            for (const newCookiesString of cookiesArray) {
              const parsedCookies = parse(newCookiesString);
              const options = {
                path: parsedCookies.Path,
                maxAge: Number(parsedCookies['Max-Age']),
                expires: parsedCookies.Expires
                  ? new Date(parsedCookies.Expires)
                  : undefined,
                httpOnly: true,
                secure: true,
              };

              if (parsedCookies.accessToken) {
                cookiesData.set(
                  'accessToken',
                  parsedCookies.accessToken,
                  options
                );
              }

              if (parsedCookies.refreshToken) {
                cookiesData.set(
                  'refreshToken',
                  parsedCookies.refreshToken,
                  options
                );
              }
            }
            return NextResponse.next({
              headers: {
                Cookie: setCookies.toString(),
              },
            });
          }
        } catch {
          return NextResponse.redirect(
            new URL('/auth/login', request.nextUrl.origin)
          );
        }
      }
      return NextResponse.redirect(
        new URL('/auth/login', request.nextUrl.origin)
      );
    }
  }

  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    } else {
      if (refreshToken) {
        try {
          const response = await refreshServer();

          const setCookies = response.request['set-cookie'];

          if (setCookies) {
            const cookiesArray = Array.isArray(setCookies)
              ? setCookies
              : [setCookies];

            for (const newCookiesString of cookiesArray) {
              const parsedCookies = parse(newCookiesString);
              const options = {
                path: parsedCookies.Path,
                maxAge: Number(parsedCookies['Max-Age']),
                expires: parsedCookies.Expires
                  ? new Date(parsedCookies.Expires)
                  : undefined,
                httpOnly: true,
                secure: true,
              };

              if (parsedCookies.accessToken) {
                cookiesData.set(
                  'accessToken',
                  parsedCookies.accessToken,
                  options
                );
              }

              if (parsedCookies.refreshToken) {
                cookiesData.set(
                  'refreshToken',
                  parsedCookies.refreshToken,
                  options
                );
              }
            }
          }
          return NextResponse.redirect(new URL('/', request.nextUrl.origin), {
            headers: {
              Cookie: setCookies.toString(),
            },
          });
        } catch {
          return NextResponse.next();
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/journey/:path*',
    '/auth/:path*',
    '/diary/:path*',
  ],
};
