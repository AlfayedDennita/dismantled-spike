import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devWeapon from './_dev/weapon.json' with { type: 'json' };
import devWeapons from './_dev/weapons.json' with { type: 'json' };

const languages = {
  en: 'en-US',
  id: 'id-ID',
};

export async function getAllWeapons(fetch, lang) {
  let weapons;

  if (!dev) {
    const params = new URLSearchParams({
      language: languages[lang] || languages.en,
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

export async function getWeaponById(fetch, id, lang) {
  let weapon;

  if (!dev) {
    const params = new URLSearchParams({
      language: languages[lang] || languages.en,
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/weapons/${id}?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    weapon = data.data;
  } else {
    weapon = devWeapon.data;
  }

  const mappedWeapon = {
    id: weapon.uuid,
    name: weapon.displayName,
    category: weapon.category.split('::').at(-1),
    images: {
      display: weapon.displayIcon,
    },
    stats: {
      ...weapon.weaponStats,
      wallPenetration: weapon.weaponStats?.wallPenetration?.split('::').at(-1),
      feature: weapon.weaponStats?.feature?.split('::').at(-1),
      fireMode: weapon.weaponStats?.fireMode?.split('::').at(-1),
      altFireType: weapon.weaponStats?.altFireType?.split('::').at(-1),
    },
    cost: weapon.shopData?.cost,
  };

  return mappedWeapon;
}
