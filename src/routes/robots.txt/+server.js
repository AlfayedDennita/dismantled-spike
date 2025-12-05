import { PUBLIC_APP_ORIGIN_URL } from '$env/static/public';

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${PUBLIC_APP_ORIGIN_URL}/sitemap.xml`,
  ]
    .join('\n')
    .trim();
  const headers = {
    'Content-Type': 'text/plain',
  };

  return new Response(body, { headers });
}
