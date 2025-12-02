import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devWeapons from './_dev/weapons.json' with { type: 'json' };

export async function getAllWeapons(fetch) {
  let weapons;

  if (!dev) {
    const params = new URLSearchParams({
      language: 'en-US',
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/weapons?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    weapons = data.data;
  } else {
    weapons = devWeapons.data;
  }

  const mappedWeapons = weapons.map((weapon) => ({
    id: weapon.uuid,
    name: weapon.displayName,
    category: weapon.category.split('::').at(-1),
    images: {
      display: weapon.displayIcon,
      flat: weapon.killStreamIcon,
    },
  }));

  const sortedWeapons = mappedWeapons.sort((weaponA, weaponB) =>
    weaponA.name < weaponB.name ? -1 : 1
  );

  return sortedWeapons;
}
