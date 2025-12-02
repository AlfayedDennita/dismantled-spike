import db from '$lib/db';

export async function load({ fetch, parent, params }) {
  const map = await db.maps.getOneById(fetch, params.id);
  const parentData = await parent();
  const metadata = {
    title: `${map.name} - Dismantled Spike`,
    description: `${map.name} - Type: ${map.type}.`,
    keywords: [...parentData.metadata.keywords, 'map', map.name, map.type],
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/maps',
      label: 'Back to Maps',
    },
    title: map.name,
  };

  return { metadata, layout, map };
}
