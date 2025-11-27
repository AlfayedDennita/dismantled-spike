import db from '$lib/db';

export async function load({ fetch }) {
  const agents = await db.agents.getAll(fetch);

  return { agents };
}
