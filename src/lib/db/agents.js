import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { PUBLIC_VALORANT_API_BASE_URL } from '$env/static/public';
import languages from '$lib/utils/languages';
import devAgent from './_dev/agent.json' with { type: 'json' };
import devAgents from './_dev/agents.json' with { type: 'json' };

export async function getAllAgents({ fetch, lang, sitemapData }) {
  let agents;

  if (!dev) {
    const params = new URLSearchParams({
      language: languages[lang].apiCode || languages.en.apiCode,
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

  if (sitemapData) {
    return agents.map((agent) => {
      const images = [];

      if (agent.fullPortrait) {
        images.push({
          url: agent.fullPortrait,
          title: `${agent.displayName} Portrait`,
        });
      }

      return {
        id: agent.uuid,
        images,
      };
    });
  }

  const mappedAgents = agents.map((agent) => ({
    id: agent.uuid,
    name: agent.displayName,
    images: {
      portrait: agent.fullPortrait,
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

export async function getAgentById({ fetch, id, lang }) {
  let agent;

  if (!dev) {
    const params = new URLSearchParams({
      language: languages[lang].apiCode || languages.en.apiCode,
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
