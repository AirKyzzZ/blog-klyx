const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';

export async function GET() {
  const robotsTxt = `# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin or private paths (none currently)
# Disallow: /admin/

# Crawl-delay for specific bots (optional)
# User-agent: Googlebot
# Crawl-delay: 0

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/rss.xml

# Host (preferred domain)
Host: ${SITE_URL}
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

