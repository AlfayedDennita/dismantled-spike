import { error } from '@sveltejs/kit';
import { PUBLIC_APP_ORIGIN_URL } from '$env/static/public';
import db from '$lib/db';

function createSitemapString(sitemapData) {
  return `
    <?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="http://www.w3.org/1999/xhtml"
			xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
		>
      ${sitemapData
        .map(
          (data) => `
        <url>
          <loc>${data.loc}</loc>
          ${data.lastmod ? `<lastmod>${data.lastmod}</lastmod>` : ''}
          ${data.changefreq ? `<changefreq>${data.changefreq}</changefreq>` : ''}
          ${data.priority ? `<priority>${data.priority}</priority>` : ''}
          ${
            data.images
              ? data.images
                  .map(
                    (image) => `
                    <image:image>
                      <image:loc>${image.loc}</image:loc>
                      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
                    </image:image>
                  `
                  )
                  .join('')
              : ''
          }
        </url>
      `
        )
        .join('')}
    </urlset>
  `.trim();
}

export async function GET({ fetch }) {
  const categoriesSitemapData = {};

  try {
    categoriesSitemapData.agents = await db.agents.getAll({
      fetch,
      sitemapData: true,
    });
    categoriesSitemapData.maps = await db.maps.getAll({
      fetch,
      sitemapData: true,
    });
    categoriesSitemapData.weapons = await db.weapons.getAll({
      fetch,
      sitemapData: true,
    });
  } catch (e) {
    console.error(e);
    error(500, 'Failed to load sitemap.');
  }

  const sitemapData = [
    {
      loc: PUBLIC_APP_ORIGIN_URL,
      priority: '1.0',
    },
  ];

  for (const category in categoriesSitemapData) {
    sitemapData.push({
      loc: `${PUBLIC_APP_ORIGIN_URL}/${category}`,
      changefreq: 'monthly',
      priority: '0.9',
    });

    for (const categorySitemapData of categoriesSitemapData[category]) {
      sitemapData.push({
        loc: `${PUBLIC_APP_ORIGIN_URL}/${category}/${categorySitemapData.id}`,
        changefreq: 'monthly',
        priority: '0.8',
        images: categorySitemapData.images.map((image) => ({
          loc: image.url,
          title: image.title,
        })),
      });
    }
  }

  const body = createSitemapString(sitemapData);
  const headers = {
    'Content-Type': 'application/xml',
  };

  return new Response(body, { headers });
}
