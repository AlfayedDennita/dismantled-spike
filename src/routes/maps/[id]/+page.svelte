<script>
  const { data } = $props();

  const typeIcons = {
    Standard: 'famicons--trophy-sharp',
    'Team Deathmatch': 'famicons--planet-sharp',
    Skirmish: 'famicons--cube-sharp',
    Practice: 'famicons--body-sharp',
  };
</script>

<main class="lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col md:gap-4 md:pb-8 lg:flex-row lg:items-start lg:gap-8 lg:py-16"
  >
    <img
      class="aspect-video w-full object-cover object-center lg:w-5/12"
      src={data.map.images.splash}
      alt="{data.map.name} Splash Art"
    />
    <section
      class="flex flex-col gap-4 px-4 py-8 md:mx-4 md:bg-base-200 md:p-8 lg:mx-0 lg:w-7/12"
    >
      <header class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-extrabold">{data.map.name}</h1>
          <div class="badge gap-1 badge-primary">
            <span class="mb-0.5 iconify {typeIcons[data.map.type]}"></span>
            {data.map.type}
          </div>
        </div>
        {#if data.map.coordinates}
          <p
            class="text-sm text-base-content/60 contrast-more:text-base-content"
          >
            Coordinates:
            <span class="font-bold italic">{data.map.coordinates}</span>
          </p>
        {/if}
      </header>
      {#if data.map.images.layout}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">Layout</h2>
          <img src={data.map.images.layout} alt="{data.map.name} Layout" />
        </section>
      {/if}
      {#if data.map.callouts}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">Callouts</h2>
          <ul class="flex flex-col gap-2">
            {#each Object.entries(data.map.callouts) as [superRegion, regions], i (superRegion)}
              <li>
                <details
                  class="collapse-arrow collapse bg-primary"
                  open={i === 0}
                >
                  <summary
                    class="collapse-title flex items-center gap-2 font-bold text-primary-content"
                    title={superRegion}
                  >
                    {superRegion}
                  </summary>
                  <div
                    class="collapse-content bg-base-200 p-4 text-sm md:bg-base-300"
                  >
                    <ul class="list-disc px-4">
                      {#each regions as region (region)}
                        <li>{region}</li>
                      {/each}
                    </ul>
                  </div>
                </details>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </section>
  </div>
</main>
