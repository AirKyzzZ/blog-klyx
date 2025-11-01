const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';

export async function GET() {
  const robotsTxt = `# *
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

