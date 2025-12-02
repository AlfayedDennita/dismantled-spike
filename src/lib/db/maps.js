import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devMap from './_dev/map.json' with { type: 'json' };
import devMaps from './_dev/maps.json' with { type: 'json' };

function getMapType(map) {
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

  return type;
}

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

  const mappedMaps = filteredMaps.map((map) => ({
    id: map.uuid,
    name: map.displayName,
    type: getMapType(map),
    images: {
      splash: map.splash,
    },
    sitesDescription: map.tacticalDescription,
  }));

  const sortedMaps = mappedMaps.sort((mapA, mapB) =>
    mapA.name < mapB.name ? -1 : 1
  );

  return sortedMaps;
}

export async function getMapById(fetch, id) {
  let map;

  if (!dev) {
    const params = new URLSearchParams({
      language: 'en-US',
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/maps/${id}?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    map = data.data;
  } else {
    map = devMap.data;
  }

  let mappedCallouts = null;

  if (map.callouts) {
    const sortedCallouts = map.callouts.sort((calloutA, calloutB) =>
      calloutA.superRegionName < calloutB.superRegionName ? -1 : 1
    );
    const groupedCallouts = Object.groupBy(
      sortedCallouts,
      (callout) => callout.superRegionName
    );
    mappedCallouts = {};

    for (const superRegion in groupedCallouts) {
      const sortedGroupedCallouts = groupedCallouts[superRegion].sort(
        (calloutA, calloutB) =>
          calloutA.regionName < calloutB.regionName ? -1 : 1
      );
      mappedCallouts[superRegion] = sortedGroupedCallouts.map(
        (callout) => callout.regionName
      );
    }
  }

  const mappedMap = {
    id: map.uuid,
    name: map.displayName,
    type: getMapType(map),
    coordinates: map.coordinates,
    images: {
      splash: map.splash,
      layout: map.displayIcon,
    },
    sitesDescription: map.tacticalDescription,
    callouts: mappedCallouts,
  };

  return mappedMap;
}
