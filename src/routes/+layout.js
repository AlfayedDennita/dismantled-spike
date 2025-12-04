import { m } from '$lib/paraglide/messages';

export function load() {
  const metadata = {
    title: `Dismantled Spike - ${m.app_tagline()}`,
    description: m.app_description(),
    keywords: [
      'Dismantled Spike',
      'VALORANT',
      'valo',
      'wiki',
      m.app_additional_keywords_1(),
      m.app_additional_keywords_2(),
    ],
  };
  const layout = {
    variant: 'home',
  };

  return { metadata, layout };
}
