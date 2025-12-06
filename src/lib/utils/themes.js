import { m } from '$lib/paraglide/messages';

const themes = {
  light: {
    name: m.header_themes_light(),
    icon: 'iconify famicons--sunny-sharp',
  },
  dark: {
    name: m.header_themes_dark(),
    icon: 'iconify famicons--moon-sharp',
  },
  system: {
    name: m.header_themes_system(),
    icon: 'iconify famicons--desktop-sharp',
  },
};

export default themes;
