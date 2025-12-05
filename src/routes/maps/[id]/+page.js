import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent, params }) {
  const map = await db.maps.getOneById({
    fetch,
    id: params.id,
    lang: getLocale(),
  });
  const parentData = await parent();
  const metadata = {
    title: `${map.name} - Dismantled Spike`,
    description: `${map.name} - ${m.map_type()}: ${map.type}.`,
    keywords: [
      ...parentData.metadata.keywords,
      m.map_additional_keywords_1(),
      map.name,
      map.type,
    ],
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/maps',
      label: m.map_back_to_agents(),
    },
    title: map.name,
  };

  return { metadata, layout, map };
}
