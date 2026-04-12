import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const hostname = req.headers.get('host') || '';
  const isFile = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|txt|xml|woff2?|map)$/i.test(
    pathname,
  );

  const isSystemRoute =
    pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next');

  if (isSystemRoute || isFile) {
    return NextResponse.next();
  }

  const rootDomain = process.env.ROOT_DOMAIN || 'hrdconcierge.com';
  const isLocalhost = hostname.includes('localhost');

  const brandSlug = isLocalhost
    ? hostname.split('.')[0]
    : hostname.replace(`.${rootDomain}`, '').replace(rootDomain, '');

  if (
    !brandSlug ||
    brandSlug === 'www' ||
    brandSlug === hostname ||
    brandSlug === 'localhost' ||
    brandSlug === rootDomain.split('.')[0]
  ) {
    return NextResponse.next();
  }

  const proxyUrl = new URL(`/${brandSlug}${pathname}`, req.url);
  const response = NextResponse.rewrite(proxyUrl);

  response.headers.set('x-brand-slug', brandSlug);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api (API routes)
     * 2. /admin (Payload CMS admin)
     * 3. /_next/static (static files)
     * 4. /_next/image (image optimization files)
     * 5. favicon.ico (favicon file)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
  ],
};
