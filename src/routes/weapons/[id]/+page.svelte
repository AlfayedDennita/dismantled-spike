<script>
  import { m } from '$lib/paraglide/messages.js';
  import {
    altFireStats,
    categoryIcons,
    damageRanges,
    displayCategory,
    displayCost,
    generalStats,
  } from '../utils.js';

  const { data } = $props();
</script>

{#snippet simpleStat(icon, name, value)}
  <li class="flex flex-col gap-2 bg-base-200 p-4 md:bg-base-300">
    <header class="flex items-center gap-1 text-primary">
      <span class="mb-1 {icon}"></span>
      <h3 class="font-bold">{name}</h3>
    </header>
    <span class="text-xl font-semibold">
      {value}
    </span>
  </li>
{/snippet}

<main class="sm:px-4 lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col md:gap-8 lg:flex-row lg:items-start lg:py-16"
  >
    <figure
      class="flex items-center justify-center bg-base-200 p-4 sm:mt-8 lg:mt-0 lg:w-4/12"
    >
      <img
        class="aspect-2/1 w-full object-contain object-center sm:max-w-sm"
        src={data.weapon.images.display}
        alt={m.weapons_weapon_display({ weapon: data.weapon.name })}
        loading="lazy"
      />
    </figure>
    <section
      class="flex flex-col gap-8 px-4 py-8 sm:px-0 md:mb-8 md:bg-base-200 md:p-8 lg:mb-0 lg:w-8/12"
    >
      <header class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-extrabold">{data.weapon.name}</h1>
          <div class="badge gap-1 badge-primary">
            <span class="mb-0.5 {categoryIcons[data.weapon.category]}"></span>
            {displayCategory[data.weapon.category]}
          </div>
        </div>
        <p
          class="flex items-center gap-2 text-sm text-base-content/60 contrast-more:text-base-content"
        >
          {m.weapon_cost_title()}:
          <span class="inline-flex items-center gap-1 font-bold">
            <span class="mb-1 iconify game-icons--two-coins"></span>
            {displayCost(data.weapon.cost)}
          </span>
        </p>
      </header>
      {#if data.weapon.name !== 'Melee'}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.weapon_stats_title_general()}</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each Object.entries(generalStats) as [statId, stat] (statId)}
              {#if stat.check(data.weapon.stats)}
                {@render simpleStat(
                  stat.icon,
                  stat.name,
                  stat.value(data.weapon.stats)
                )}
              {/if}
            {/each}
          </ul>
        </section>
      {/if}
      {#if data.weapon.stats.altFireType}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.weapon_stats_title_alt_fire()}</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each Object.entries(altFireStats) as [statId, stat] (statId)}
              {#if stat.check(data.weapon.stats)}
                {@render simpleStat(
                  stat.icon,
                  stat.name,
                  stat.value(data.weapon.stats)
                )}
              {/if}
            {/each}
          </ul>
        </section>
      {/if}
      {#if data.weapon.stats.damageRanges}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.weapon_damages_title()}</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each data.weapon.stats.damageRanges as damageRange (damageRange.rangeStartMeters)}
              <li class="flex flex-col bg-base-200 md:bg-base-300">
                <header
                  class="flex items-center justify-center bg-primary p-1 text-center text-primary-content"
                >
                  <h3 class="font-bold">
                    {damageRange.rangeStartMeters} m&ndash;{damageRange.rangeEndMeters}
                    m
                  </h3>
                </header>
                <ul class="flex flex-col justify-center p-4 text-center">
                  {#each Object.entries(damageRanges) as [rangeId, range] (rangeId)}
                    <li
                      class="flex items-center justify-between gap-2 before:order-1 before:mb-2 before:flex-1 before:self-end before:border-b before:border-dashed"
                    >
                      <span class="flex items-center gap-1 font-semibold">
                        <span class="mb-1 {range.icon}"></span>
                        {range.name}
                      </span>
                      <span class="order-2">
                        {parseFloat(damageRange[rangeId].toFixed(2))}
                      </span>
                    </li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </section>
  </div>
</main>
