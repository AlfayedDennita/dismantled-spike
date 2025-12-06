<script>
  import { m } from '$lib/paraglide/messages.js';
  import { displayType, typeIcons } from '../utils.js';

  const { data } = $props();
</script>

<main class="sm:px-4 lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col md:gap-8 lg:flex-row lg:items-start lg:py-16"
  >
    <figure
      class="flex items-center justify-center bg-base-200 sm:mt-8 lg:mt-0 lg:w-5/12"
    >
      <img
        class="aspect-video w-full object-cover object-center sm:max-w-2xl"
        src={data.map.images.splash}
        alt={m.maps_splash_art({ map: data.map.name })}
        loading="lazy"
      />
    </figure>
    <section
      class="flex flex-col gap-4 px-4 py-8 sm:px-0 md:mb-8 md:bg-base-200 md:p-8 lg:mb-0 lg:w-7/12"
    >
      <header class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-extrabold">{data.map.name}</h1>
          <div class="badge gap-1 badge-primary">
            <span class="mb-0.5 {typeIcons[data.map.type]}"></span>
            {displayType[data.map.type]}
          </div>
        </div>
        {#if data.map.coordinates}
          <p
            class="text-sm text-base-content/60 contrast-more:text-base-content"
          >
            {m.map_coordinates()}:
            <span class="font-bold italic">{data.map.coordinates}</span>
          </p>
        {/if}
      </header>
      {#if data.map.images.layout}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.map_layout()}</h2>
          <img
            class="aspect-square w-full object-contain object-center sm:max-w-sm"
            src={data.map.images.layout}
            alt="{data.map.name} Layout"
            loading="lazy"
          />
        </section>
      {/if}
      {#if data.map.callouts}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.map_callouts()}</h2>
          <ul class="flex flex-col gap-2">
            {#each Object.entries(data.map.callouts) as [superRegion, regions], i (superRegion)}
              <li>
                <details
                  class="collapse-arrow collapse bg-primary"
                  open={i === 0}
                >
                  <summary
                    class="collapse-title flex items-center gap-2 text-primary-content"
                    title={superRegion}
                  >
                    <h3 class="font-bold">{superRegion}</h3>
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
