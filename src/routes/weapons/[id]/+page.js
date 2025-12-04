import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent, params }) {
  const weapon = await db.weapons.getOneById(fetch, params.id, getLocale());
  const parentData = await parent();
  const metadata = {
    title: `${weapon.name} - Dismantled Spike`,
    description: `${weapon.name} - ${m.weapon_category()}: ${weapon.category}.`,
    keywords: [
      ...parentData.metadata.keywords,
      m.weapon_additional_keywords_1(),
      'arsenal',
      weapon.name,
      weapon.category,
    ],
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/weapons',
      label: m.weapon_back_to_agents(),
    },
    title: weapon.name,
  };

  return { metadata, layout, weapon };
}
