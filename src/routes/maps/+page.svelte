<script>
  import CategoryMain from '$lib/components/CategoryMain.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { displayType, typeIcons } from './utils.js';

  const { data } = $props();
</script>

<CategoryMain title={m.categories_maps()}>
  {#each data.maps as map (map.id)}
    <article
      class="card w-full grow bg-base-200 sm:max-w-[calc(100%/2-var(--spacing)*8/2)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)]"
    >
      <a class="group contents" href="/maps/{map.id}" title={map.name}>
        <figure class="relative">
          <img
            class="aspect-video w-full object-cover object-center brightness-75 transition-all group-hover:scale-125 group-hover:brightness-100 motion-reduce:transition-none contrast-more:brightness-100"
            src={map.images.splash}
            alt={m.maps_splash_art({ map: map.name })}
            loading="lazy"
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
            class="flex flex-col justify-between gap-1 @2xs:flex-row @2xs:items-center @2xs:gap-2"
          >
            <h2 class="card-title text-xl uppercase">
              {map.name}
            </h2>
            <div class="badge">
              <span class="mb-0.5 text-xs {typeIcons[map.type]}"></span>
              {displayType[map.type]}
            </div>
          </div>
        </div>
      </a>
    </article>
  {/each}
</CategoryMain>
