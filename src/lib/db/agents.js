import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devAgents from './_dev/agents.json' with { type: 'json' };

export async function getAllAgents(fetch) {
  let agents = devAgents.data;

  if (!dev) {
    const params = new URLSearchParams({
      language: 'en-US',
      isPlayableCharacter: true,
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/agents?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    agents = data.data;
  }

  const filteredAgents = agents.map((agent) => ({
    id: agent.uuid,
    name: agent.displayName,
    images: {
      icon: agent.displayIcon,
      portrait: agent.fullPortrait,
      background: agent.background,
      backgroundGradientColors: agent.backgroundGradientColors,
    },
    role: {
      name: agent.role.displayName,
      icon: agent.role.displayIcon,
    },
  }));

  return filteredAgents;
}
