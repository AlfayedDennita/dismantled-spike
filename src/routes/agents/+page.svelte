<script>
  const { data } = $props();
</script>

<main class="px-4 lg:px-12">
  <div class="mx-auto flex max-w-7xl flex-col gap-8 py-8 lg:gap-12 lg:py-16">
    <h1
      class=" text-center text-2xl font-bold uppercase lg:text-3xl lg:font-extrabold"
    >
      Agents
    </h1>
    <div class="flex flex-wrap justify-center gap-8">
      {#each data.agents as agent (agent.id)}
        <article
          class="card grow bg-base-200 sm:max-w-[calc(100%/2-var(--spacing)*8/2)] md:max-w-[calc(100%/3-var(--spacing)*16/3)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)] xl:max-w-[calc(100%/4-var(--spacing)*24/4)]"
        >
          <a
            class="group"
            href="/agents/{agent.id}"
            title="{agent.name} ({agent.role.name})"
          >
            <figure
              class="relative before:absolute before:inset-x-0 before:bottom-0 before:h-0 before:bg-base-300 before:transition-[height] group-hover:before:h-full motion-reduce:before:transition-none"
            >
              <img
                class="z-10"
                src={agent.images.portrait}
                alt="{agent.name} Portrait"
              />
            </figure>
            <div class="card-body bg-primary text-primary-content">
              <h2 class="card-title text-xl uppercase">
                <img
                  class="mb-1 h-4"
                  src={agent.role.icon}
                  alt={agent.role.name}
                />
                <span>
                  {agent.name}
                </span>
              </h2>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</main>
