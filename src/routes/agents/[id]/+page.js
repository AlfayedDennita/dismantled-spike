import db from '$lib/db';
import { m } from '$lib/paraglide/messages.js';
import { getLocale } from '$lib/paraglide/runtime.js';

export async function load({ fetch, parent, params }) {
  const agent = await db.agents.getOneById({
    fetch,
    id: params.id,
    lang: getLocale(),
  });
  const parentData = await parent();
  const metadata = {
    title: `${agent.name} - Dismantled Spike`,
    description: agent.description,
    keywords: [
      ...parentData.metadata.keywords,
      m.agent_additional_keywords_1(),
      m.agent_additional_keywords_2(),
      m.agent_additional_keywords_3(),
      agent.name,
      agent.role.name,
    ],
    image: agent.images.portrait || parentData.metadata.image,
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/agents',
      label: m.agent_back_to_agents(),
    },
    title: agent.name,
  };

  return { metadata, layout, agent };
}
