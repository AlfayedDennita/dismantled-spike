import { m } from '$lib/paraglide/messages.js';

export const typeIcons = {
  Standard: 'iconify famicons--trophy-sharp',
  TeamDeathmatch: 'iconify famicons--planet-sharp',
  Skirmish: 'iconify famicons--cube-sharp',
  Practice: 'iconify famicons--body-sharp',
};

export const displayType = {
  Standard: m.maps_types_standard(),
  TeamDeathmatch: 'Team Deathmatch',
  Skirmish: 'Skirmish',
  Practice: m.maps_types_practice(),
};
