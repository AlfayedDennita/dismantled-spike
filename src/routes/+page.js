import CategoryAgents from '$lib/assets/images/categories/agents.webp';
import CategoryBundles from '$lib/assets/images/categories/bundles.webp';
import CategoryFlex from '$lib/assets/images/categories/flex.webp';
import CategoryGunBuddiess from '$lib/assets/images/categories/gun-buddies.webp';
import CategoryMaps from '$lib/assets/images/categories/maps.webp';
import CategoryWeapons from '$lib/assets/images/categories/weapons.webp';
import { m } from '$lib/paraglide/messages';

export function load() {
  const categories = [
    {
      name: m.categories_agents(),
      url: '/agents',
      icon: 'famicons--people-sharp',
      image: CategoryAgents,
    },
    {
      name: m.categories_maps(),
      url: '/maps',
      icon: 'famicons--map-sharp',
      image: CategoryMaps,
    },
    {
      name: m.categories_weapons(),
      url: '/weapons',
      icon: 'famicons--build-sharp',
      image: CategoryWeapons,
    },
    {
      name: m.categories_bundles(),
      url: null,
      icon: 'famicons--cube-sharp',
      image: CategoryBundles,
    },
    {
      name: 'Gun Buddies',
      url: null,
      icon: 'famicons--leaf-sharp',
      image: CategoryGunBuddiess,
    },
    {
      name: 'Flex',
      url: null,
      icon: 'famicons--hourglass-sharp',
      image: CategoryFlex,
    },
  ];
  const recentVisits = [
    {
      name: 'Lorem ipsum dolor sit amet',
      url: '/',
    },
    {
      name: 'Nam consectetur metus ac',
      url: '/',
    },
    {
      name: 'Morbi pharetra dolor',
      url: '/',
    },
    {
      name: 'Nulla in leo',
      url: '/',
    },
    {
      name: 'Praesent a tincidunt',
      url: '/',
    },
  ];

  return { categories, recentVisits };
}
