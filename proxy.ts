import { NextResponse, type NextRequest } from 'next/server';

import { RETIRED_GONE, RETIRED_REDIRECTS } from './lib/retired-urls';

const TARGET = 'https://klyx.fr';

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/(.)\/+$/, '$1');
  const target = RETIRED_REDIRECTS[pathname];
  if (target) return NextResponse.redirect(`${TARGET}${target}`, 308);
  if (RETIRED_GONE.includes(pathname) || pathname.startsWith('/tags/')) {
    return new NextResponse(`Cet article a été retiré. Le blog Klyx : ${TARGET}/blog\n`, {
      status: 410,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/posts/:path*',
    '/wordpress-vs-next-creation-site',
    '/about',
    '/contact',
    '/tags/:path*',
    '/rss.xml',
  ],
};
