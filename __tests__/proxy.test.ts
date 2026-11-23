/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import proxy from '@/proxy';

const run = (path: string) => proxy(new NextRequest(`https://blog.klyx.fr${path}`));

describe('proxy', () => {
  it.each([
    ['/', 'https://klyx.fr/blog'],
    ['/posts', 'https://klyx.fr/blog'],
    ['/posts/creation-site-web-bordeaux-2025', 'https://klyx.fr/services/creation-site-web'],
    ['/posts/cout-creation-site-web', 'https://klyx.fr/tarifs'],
    ['/posts/choisir-agence-web-bordeaux', 'https://klyx.fr/agence-ia-bordeaux'],
    ['/posts/wordpress-vs-next-creation-site', 'https://klyx.fr/services/creation-site-web'],
    ['/wordpress-vs-next-creation-site', 'https://klyx.fr/services/creation-site-web'],
    ['/posts/bdx-io-2025-conference-tech-bordeaux', 'https://klyx.fr/blog'],
    ['/about', 'https://klyx.fr/a-propos'],
    ['/contact?utm_source=x', 'https://klyx.fr/contact'],
    ['/tags', 'https://klyx.fr/blog'],
    ['/rss.xml', 'https://klyx.fr/blog/rss.xml'],
  ])('redirects %s to %s with a 308', (path, destination) => {
    const response = run(path);
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(destination);
  });

  it.each([
    '/posts/seo-local-bordeaux',
    '/posts/etude-cas-site-evenements',
    '/posts/calendrier-evenements-bordeaux-2025',
    '/posts/tendances-web-design-2025',
    '/posts/optimiser-site-wordpress-vitesse',
    '/posts/strategie-contenu-sites-b2b',
    '/posts/roi-cache-site-web-2025',
    '/tags/guide',
    '/tags/etude-de-cas',
  ])('answers %s with 410 Gone', (path) => {
    expect(run(path).status).toBe(410);
  });

  it('leaves unknown posts to the 404 page', () => {
    expect(run('/posts/inconnu').headers.get('x-middleware-next')).toBe('1');
  });
});
