import { PUBLIC_APP_ORIGIN_URL } from '$env/static/public';
import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent }) {
  const agents = await db.agents.getAll({ fetch, lang: getLocale() });
  const parentData = await parent();
  const metadata = {
    title: `${m.categories_agents()} - Dismantled Spike`,
    description: m.agents_description(),
    keywords: [
      ...parentData.metadata.keywords,
      m.agents_additional_keywords_1(),
      m.agents_additional_keywords_2(),
      m.agents_additional_keywords_3(),
    ],
    image: `${PUBLIC_APP_ORIGIN_URL}/images/og/agents.png`,
  };

  return { metadata, agents };
}
