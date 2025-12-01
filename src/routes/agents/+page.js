import db from '$lib/db';

export async function load({ fetch, parent }) {
  const agents = await db.agents.getAll(fetch);
  const parentData = await parent();
  const metadata = {
    title: 'Agents - Dismantled Spike',
    description:
      'Agents are the playable characters in VALORANT, representing an agent of the VALORANT protocol. Each agent serves as a different role or class with four unique abilities. There are four roles/classes: duelist, initiator, controller, and sentinel.',
    keywords: [
      ...parentData.metadata.keywords,
      'agents',
      'characters',
      'heroes',
    ],
  };

  return { metadata, agents };
}
