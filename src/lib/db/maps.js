import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devMaps from './_dev/maps.json' with { type: 'json' };

export async function getAllMaps(fetch) {
  let maps;

  if (!dev) {
    const params = new URLSearchParams({
      language: 'en-US',
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/maps?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    maps = data.data;
  } else {
    maps = devMaps.data;
  }

  // Remove old The Range map
  const filteredMaps = maps.filter((map) => !map.mapUrl.endsWith('Range'));

  const mappedmaps = filteredMaps.map((map) => {
    let type;
    const practiceMaps = ['Basic Training', 'The Range'];

    if (practiceMaps.includes(map.displayName)) {
      type = 'Practice';
    } else if (map.callouts) {
      if (map.tacticalDescription) {
        type = 'Standard';
      } else {
        type = 'Team Deathmatch';
      }
    } else {
      type = 'Skirmish';
    }

    return {
      id: map.uuid,
      name: map.displayName,
      type,
      sitesDescription: map.tacticalDescription,
      images: {
        splash: map.splash,
      },
    };
  });

  const sortedMaps = mappedmaps.sort((mapA, mapB) =>
    mapA.name < mapB.name ? -1 : 1
  );

  return sortedMaps;
}
