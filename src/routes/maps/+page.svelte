<script>
  import { m } from '$lib/paraglide/messages.js';

  const { data } = $props();

  const typeIcons = {
    Standard: 'famicons--trophy-sharp',
    'Team Deathmatch': 'famicons--planet-sharp',
    Skirmish: 'famicons--cube-sharp',
    Practice: 'famicons--body-sharp',
  };

  const displayType = {
    Standard: m.maps_types_standard(),
    'Team Deathmatch': 'Team Deathmatch',
    Skirmish: 'Skirmish',
    Practice: m.maps_types_practice(),
  };
</script>

<main class="px-4 lg:px-12">
  <div class="mx-auto flex max-w-7xl flex-col gap-8 py-8 lg:gap-12 lg:py-16">
    <h1
      class="text-center text-2xl font-bold uppercase lg:text-3xl lg:font-extrabold"
    >
      {m.categories_maps()}
    </h1>
    <div class="flex flex-wrap justify-center gap-8">
      {#each data.maps as map (map.id)}
        <article
          class="card grow bg-base-200 md:max-w-[calc(100%/2-var(--spacing)*8/2)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)]"
        >
          <a class="group" href="/maps/{map.id}" title={map.name}>
            <figure class="relative">
              <img
                class="aspect-video w-full object-cover object-center brightness-75 transition-all group-hover:scale-125 group-hover:brightness-100 motion-reduce:transition-none contrast-more:brightness-100"
                src={map.images.splash}
                alt={m.maps_splash_art({ map: map.name })}
              />
              {#if map.sitesDescription}
                <figcaption
                  class="absolute top-4 left-4 badge badge-sm transition-opacity badge-primary group-hover:opacity-0 motion-reduce:transition-none"
                >
                  {map.sitesDescription}
                </figcaption>
              {/if}
            </figure>
            <div class="@container card-body bg-primary text-primary-content">
              <div
                class="flex flex-col justify-between gap-2 @2xs:flex-row @2xs:items-center"
              >
                <h2 class="card-title text-xl uppercase">
                  {map.name}
                </h2>
                <div class="badge">
                  <span class="mb-0.5 iconify text-xs {typeIcons[map.type]}"
                  ></span>
                  {displayType[map.type]}
                </div>
              </div>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</main>
