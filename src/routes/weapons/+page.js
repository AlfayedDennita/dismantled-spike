import db from '$lib/db';

export async function load({ fetch, parent }) {
  const weapons = await db.weapons.getAll(fetch);
  const parentData = await parent();
  const metadata = {
    title: 'Weapons - Dismantled Spike',
    description:
      'Weapons (arsenal) are used by agents (players) to damage and kill/destroy enemy agents and their utilities. Weapons are separated into three main categories: melee, sidearms, and primary weapons. Sidearms consist of pistols, while primary weapons are further split into SMGs, shotguns, rifles, sniper rifles, and heavy machine guns.',
    keywords: [...parentData.metadata.keywords, 'weapons', 'arsenal', 'guns'],
  };

  return { metadata, weapons };
}
