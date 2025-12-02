import db from '$lib/db';

export async function load({ fetch, parent }) {
  const maps = await db.maps.getAll(fetch);
  const parentData = await parent();
  const metadata = {
    title: 'Maps - Dismantled Spike',
    description:
      'Each match of VALORANT takes place on a map. There are four map types: standard, team deathmatch, skirmish, and practice. VALORANT uses a deterministic map system in order to increase the variety of maps players will encounter and vastly reduce the possibility of playing on the same map multiple times in a row.',
    keywords: [...parentData.metadata.keywords, 'maps'],
  };

  return { metadata, maps };
}
