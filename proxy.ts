import { NextResponse, type NextRequest } from 'next/server';

const TARGET = 'https://klyx.fr';

const REDIRECTS: Record<string, string> = {
  '/': '/blog',
  '/posts': '/blog',
  '/posts/creation-site-web-bordeaux-2025': '/services/creation-site-web',
  '/posts/cout-creation-site-web': '/tarifs',
  '/posts/choisir-agence-web-bordeaux': '/agence-ia-bordeaux',
  '/posts/wordpress-vs-next-creation-site': '/services/creation-site-web',
  '/wordpress-vs-next-creation-site': '/services/creation-site-web',
  '/posts/bdx-io-2025-conference-tech-bordeaux': '/blog',
  '/about': '/a-propos',
  '/contact': '/contact',
  '/tags': '/blog',
  '/rss.xml': '/blog/rss.xml',
};

const GONE = [
  '/posts/seo-local-bordeaux',
  '/posts/etude-cas-site-evenements',
  '/posts/calendrier-evenements-bordeaux-2025',
  '/posts/tendances-web-design-2025',
  '/posts/optimiser-site-wordpress-vitesse',
  '/posts/strategie-contenu-sites-b2b',
  '/posts/roi-cache-site-web-2025',
];

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/(.)\/+$/, '$1');
  const target = REDIRECTS[pathname];
  if (target) return NextResponse.redirect(`${TARGET}${target}`, 308);
  if (GONE.includes(pathname) || pathname.startsWith('/tags/')) {
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
