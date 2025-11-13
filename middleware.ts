import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public/static assets (including PDF resume) to bypass auth
  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    pathname === '/resume.pdf' ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|txt|css|js|json|mp4|webm)$/i.test(pathname);

  if (isPublicAsset) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');
  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // If not configured, allow local/dev access to avoid lockout
  if (!username || !password) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ');
    if (scheme === 'Basic' && encoded) {
      try {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        if (user === username && pass === password) {
          return NextResponse.next();
        }
      } catch (e) {
        // Fall through to 401
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  });
}

export const config = {
  matcher: ['/(.*)'],
};