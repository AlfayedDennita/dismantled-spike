import db from '$lib/db';

export async function load({ fetch, parent, params }) {
  const weapon = await db.weapons.getOneById(fetch, params.id);
  const parentData = await parent();
  const metadata = {
    title: `${weapon.name} - Dismantled Spike`,
    description: `${weapon.name} - Category: ${weapon.category}.`,
    keywords: [
      ...parentData.metadata.keywords,
      'weapon',
      'arsenal',
      weapon.name,
      weapon.category,
    ],
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/weapons',
      label: 'Back to Weapons',
    },
    title: weapon.name,
  };

  return { metadata, layout, weapon };
}
