<script>
  import CategoryMain from '$lib/components/CategoryMain.svelte';
  import { m } from '$lib/paraglide/messages.js';

  const { data } = $props();
</script>

<CategoryMain title={m.categories_agents()}>
  {#each data.agents as agent (agent.id)}
    <article
      class="card w-full grow bg-base-200 sm:max-w-[calc(100%/2-var(--spacing)*8/2)] md:max-w-[calc(100%/3-var(--spacing)*16/3)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)] xl:max-w-[calc(100%/4-var(--spacing)*24/4)]"
    >
      <a
        class="group contents"
        href="/agents/{agent.id}"
        title="{agent.name} ({agent.role.name})"
      >
        <figure
          class="relative p-4 before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-base-300 before:transition-[height] group-hover:before:h-full motion-reduce:before:transition-none"
        >
          <img
            class="z-10 aspect-512/465 w-full object-contain object-center"
            src={agent.images.portrait}
            alt={m.agents_portrait({ agent: agent.name })}
            loading="lazy"
          />
        </figure>
        <div class="card-body bg-primary text-primary-content">
          <div class="flex items-center gap-2">
            <img
              class="mb-1 h-4"
              src={agent.role.icon}
              alt={agent.role.name}
              loading="lazy"
            />
            <h2 class="card-title text-xl uppercase">{agent.name}</h2>
          </div>
        </div>
      </a>
    </article>
  {/each}
</CategoryMain>
