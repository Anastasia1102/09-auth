import { parse } from 'cookie'
import { NextRequest, NextResponse } from 'next/server'
import { checkServerSession } from './lib/api/serverApi'

const privateRoutes = ["/profile","/notes"]
const publicRoutes = ["/sign-in", "/sign-up"]

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('accessToken')?.value;

  const { pathname } = request.nextUrl
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname)

  if (!accessToken && refreshToken) {
    try {
      const cookieHeader = request.headers.get('cookie') ?? '';
      const res = await checkServerSession(cookieHeader);
      const setCookies = res.headers['set-cookies'];

    if (setCookies) {
      const array = Array.isArray(setCookies) ? setCookies : [setCookies]
      const next = NextResponse.next();
      for (const cookiesStr of array) {
        if (!cookiesStr) continue;
          const parsed = parse(cookiesStr)
          const options: Parameters<typeof next.cookies.set>[2] = {
            maxAge: Number(parsed['Max-Age']),
            path: parsed.Path,
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          }
          if (parsed.accessToken) {
            next.cookies.set('accessToken', parsed.accessToken, options)
          }
          if (parsed.refreshToken) {
            next.cookies.set('refreshToken', parsed.refreshToken, options)
        }
        if (isPublicRoute) return NextResponse.redirect(new URL('/profile', request.url), { headers: next.headers });
        }
      return next;
      }
    }catch {
    }
  }

  const isAuthed = Boolean(accessToken || refreshToken || request.cookies.get('accessToken')?.value);
  if (isPrivateRoute && !isAuthed) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  if (isPublicRoute && isAuthed) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
}