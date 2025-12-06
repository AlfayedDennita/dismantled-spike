import CategoryAgents from '$lib/assets/images/categories/agents.webp';
import CategoryBundles from '$lib/assets/images/categories/bundles.webp';
import CategoryFlex from '$lib/assets/images/categories/flex.webp';
import CategoryGunBuddiess from '$lib/assets/images/categories/gun-buddies.webp';
import CategoryMaps from '$lib/assets/images/categories/maps.webp';
import CategoryWeapons from '$lib/assets/images/categories/weapons.webp';
import { m } from '$lib/paraglide/messages';

const categories = {
  home: {
    name: m.categories_home(),
    url: '/',
    icon: 'iconify famicons--home-sharp',
    image: null,
  },
  agents: {
    name: m.categories_agents(),
    url: '/agents',
    icon: 'iconify famicons--people-sharp',
    image: CategoryAgents,
  },
  maps: {
    name: m.categories_maps(),
    url: '/maps',
    icon: 'iconify famicons--map-sharp',
    image: CategoryMaps,
  },
  weapons: {
    name: m.categories_weapons(),
    url: '/weapons',
    icon: 'iconify game-icons--crossed-pistols',
    image: CategoryWeapons,
  },
  bundles: {
    name: m.categories_bundles(),
    url: null,
    icon: 'iconify famicons--cube-sharp',
    image: CategoryBundles,
  },
  buddies: {
    name: 'Gun Buddies',
    url: null,
    icon: 'iconify famicons--leaf-sharp',
    image: CategoryGunBuddiess,
  },
  flex: {
    name: 'Flex',
    url: null,
    icon: 'iconify famicons--hourglass-sharp',
    image: CategoryFlex,
  },
};

function getEnabledCategories() {
  const enblCategories = {};

  for (const [categoryId, category] of Object.entries(categories)) {
    if (category.url) {
      enblCategories[categoryId] = category;
    }
  }

  return enblCategories;
}

export default categories;
export const enabledCategories = getEnabledCategories();
