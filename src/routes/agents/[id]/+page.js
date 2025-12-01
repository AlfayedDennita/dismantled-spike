import db from '$lib/db';

export async function load({ fetch, parent, params }) {
  const agent = await db.agents.getOneById(fetch, params.id);
  const parentData = await parent();
  const metadata = {
    title: `${agent.name} - Dismantled Spike`,
    description: agent.description,
    keywords: [
      ...parentData.metadata.keywords,
      'agent',
      'character',
      'hero',
      agent.name,
      agent.role.name,
    ],
  };
  const layout = {
    variant: 'detail',
    backData: {
      url: '/agents',
      label: 'Back to Agents',
    },
    title: agent.name,
  };

  return { metadata, layout, agent };
}
