import { PUBLIC_APP_ORIGIN_URL } from '$env/static/public';
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
    image: `${PUBLIC_APP_ORIGIN_URL}/images/og/default.png`,
  };
  const layout = {
    variant: 'home',
  };

  return { metadata, layout };
}
