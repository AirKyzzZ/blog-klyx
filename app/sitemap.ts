import { MetadataRoute } from 'next';

import { RETIRED_GONE, RETIRED_REDIRECTS } from '@/lib/retired-urls';

const RETIRED_AT = new Date('2026-11-23');

export default function sitemap(): MetadataRoute.Sitemap {
  return [...Object.keys(RETIRED_REDIRECTS), ...RETIRED_GONE]
    .filter((path) => path !== '/rss.xml')
    .map((path) => ({ url: `https://blog.klyx.fr${path}`, lastModified: RETIRED_AT }));
}
