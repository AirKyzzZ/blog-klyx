export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://klyx.fr/sitemap.xml
Sitemap: https://blog.klyx.fr/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
