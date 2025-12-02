import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import devAgent from './_dev/agent.json' with { type: 'json' };
import devAgents from './_dev/agents.json' with { type: 'json' };

export async function getAllAgents(fetch) {
  let agents;

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
  } else {
    agents = devAgents.data;
  }

  const mappedAgents = agents.map((agent) => ({
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

  const sortedAgents = mappedAgents.sort((agentA, agentB) =>
    agentA.name < agentB.name ? -1 : 1
  );

  return sortedAgents;
}

export async function getAgentById(fetch, id) {
  let agent;

  if (!dev) {
    const params = new URLSearchParams({
      language: 'en-US',
    });
    const res = await fetch(
      `${PUBLIC_VALORANT_API_BASE_URL}/agents/${id}?${params.toString()}`
    );
    const data = await res.json();

    if (data.status !== 200) {
      error(data.status, data.error);
    }

    agent = data.data;
  } else {
    agent = devAgent.data;
  }

  const mappedAbilities = agent.abilities.map((ability) => ({
    slot: ability.slot,
    name: ability.displayName,
    description: ability.description,
    icon: ability.displayIcon,
  }));

  const sortedAbilities = mappedAbilities.sort((abilityA, abilityB) => {
    const slotOrder = [
      'Passive',
      'Grenade',
      'Ability1',
      'Ability2',
      'Ultimate',
    ];

    return (
      slotOrder.findIndex((slot) => slot === abilityA.slot) -
      slotOrder.findIndex((slot) => slot === abilityB.slot)
    );
  });

  const mappedAgent = {
    id: agent.uuid,
    name: agent.displayName,
    description: agent.description,
    codeName: agent.developerName,
    images: {
      icon: agent.displayIcon,
      portrait: agent.fullPortrait,
      background: agent.background,
      backgroundGradientColors: agent.backgroundGradientColors,
    },
    role: {
      name: agent.role.displayName,
      description: agent.role.description,
      icon: agent.role.displayIcon,
    },
    abilities: sortedAbilities,
  };

  return mappedAgent;
}
