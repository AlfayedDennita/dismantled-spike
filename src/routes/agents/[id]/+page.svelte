<script>
  const { data } = $props();

  const stringBackgroundGradientColors = $derived.by(() => {
    const paddedBackgroundGradientColors =
      data.agent.images.backgroundGradientColors.map(
        (hexColor) => `#${hexColor}`
      );

    return paddedBackgroundGradientColors.join(', ');
  });

  const abilitiesInfo = {
    Passive: 'Passive',
    Grenade: 'C',
    Ability1: 'Q',
    Ability2: 'E',
    Ultimate: 'X/Ultimate',
  };
</script>

<main class="lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col md:gap-4 md:pb-8 lg:flex-row lg:items-start lg:gap-8 lg:py-12"
  >
    <div
      class="relative flex items-center justify-center bg-base-200 p-4 lg:w-4/12"
    >
      <img
        class="size-full object-contain object-center"
        src={data.agent.images.portrait}
        alt="{data.agent.name} Portrait"
      />
      <div
        class="absolute top-4 right-4 aspect-175/256 w-1/5"
        style:background="linear-gradient(to bottom, {stringBackgroundGradientColors})"
        style:mask="url('{data.agent.images.background}') no-repeat center"
        style:mask-size="100%"
        aria-hidden="true"
      ></div>
    </div>
    <section
      class="flex flex-col gap-4 px-4 py-8 md:mx-4 md:bg-base-200 md:p-8 lg:mx-0 lg:w-8/12"
    >
      <header class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-extrabold">{data.agent.name}</h1>
          <div class="flex items-center gap-1">
            <div class="badge gap-1 badge-primary">
              <img
                class="mb-0.5 size-3 object-contain object-center"
                src={data.agent.role.icon}
                alt={data.agent.role.name}
              />
              {data.agent.role.name}
            </div>
            <div
              class="tooltip tooltip-bottom flex items-center justify-center text-sm tooltip-secondary text-base-content/20 transition-colors hover:text-base-content motion-reduce:transition-none contrast-more:text-base-content"
              aria-label="Role Description"
              data-tip={data.agent.role.description}
            >
              <span class="iconify famicons--information-circle-sharp"></span>
            </div>
          </div>
        </div>
        <p class="text-sm text-base-content/60 contrast-more:text-base-content">
          Code Name:
          <span class="font-bold italic">{data.agent.codeName}</span>
        </p>
      </header>
      <p>{data.agent.description}</p>
      <section class="flex flex-col gap-2">
        <h2 class="font-bold uppercase">Abilities</h2>
        <ul class="flex flex-col gap-2">
          {#each data.agent.abilities as ability, i (ability.name)}
            <li>
              <details
                class="collapse-arrow collapse bg-primary"
                open={i === 0}
              >
                <summary
                  class="collapse-title flex items-center gap-2 font-bold text-primary-content"
                  title={ability.name}
                >
                  <img
                    class="mb-1 size-4 object-contain object-center"
                    src={ability.icon}
                    alt={ability.name}
                  />
                  {ability.name}
                  [{abilitiesInfo[ability.slot]}]
                </summary>
                <div
                  class="collapse-content bg-base-200 p-4 text-sm md:bg-base-300"
                >
                  {ability.description}
                </div>
              </details>
            </li>
          {/each}
        </ul>
      </section>
    </section>
  </div>
</main>
