import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent }) {
  const maps = await db.maps.getAll({ fetch, lang: getLocale() });
  const parentData = await parent();
  const metadata = {
    title: `${m.categories_maps()} - Dismantled Spike`,
    description: m.maps_description(),
    keywords: [...parentData.metadata.keywords, m.maps_additional_keywords_1()],
  };

  return { metadata, maps };
}
