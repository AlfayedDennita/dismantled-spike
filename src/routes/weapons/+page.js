import { PUBLIC_APP_ORIGIN_URL } from '$env/static/public';
import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent }) {
  const weapons = await db.weapons.getAll({ fetch, lang: getLocale() });
  const parentData = await parent();
  const metadata = {
    title: `${m.categories_weapons()} - Dismantled Spike`,
    description: '',
    keywords: [
      ...parentData.metadata.keywords,
      m.weapons_additional_keywords_1(),
      'arsenal',
      m.weapons_additional_keywords_2(),
    ],
    image: `${PUBLIC_APP_ORIGIN_URL}/images/og/weapons.png`,
  };

  return { metadata, weapons };
}
