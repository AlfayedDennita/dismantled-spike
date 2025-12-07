<script>
  import CategoryMain from '$lib/components/CategoryMain.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { categoryIcons, displayCategory } from './utils.js';

  const { data } = $props();
</script>

<CategoryMain title={m.categories_weapons()}>
  {#each data.weapons as weapon (weapon.id)}
    <article
      class="card w-full grow bg-base-200 sm:max-w-[calc(100%/2-var(--spacing)*8/2)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)] xl:max-w-[calc(100%/4-var(--spacing)*24/4)]"
    >
      <a class="group contents" href="/weapons/{weapon.id}" title={weapon.name}>
        <figure class="relative h-60">
          <img
            class="aspect-2/1 w-full object-contain object-center p-4"
            src={weapon.images.display}
            alt={m.weapons_weapon_display({ weapon: weapon.name })}
            loading="lazy"
          />
          <div
            class="absolute inset-x-0 -bottom-full flex h-full items-center justify-center bg-primary transition-[bottom] group-hover:bottom-0 motion-reduce:transition-none"
          >
            <img
              class="aspect-2/1 w-full object-contain object-center p-4"
              src={weapon.images.flat}
              alt={m.weapons_weapon_flat({ weapon: weapon.name })}
              loading="lazy"
            />
          </div>
          <figcaption
            class="absolute bottom-4 left-4 badge transition-opacity badge-primary group-hover:opacity-0 motion-reduce:transition-none"
          >
            <span class="mb-0.5 {categoryIcons[weapon.category]}"></span>
            {displayCategory[weapon.category]}
          </figcaption>
        </figure>
        <div class="card-body bg-primary text-primary-content">
          <h2 class="card-title text-xl uppercase">
            {weapon.name}
          </h2>
        </div>
      </a>
    </article>
  {/each}
</CategoryMain>
