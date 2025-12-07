<script>
  import { m } from '$lib/paraglide/messages.js';
  import categories from '$lib/utils/categories.js';

  const { home: _home, ...filteredCategories } = categories;

  const { data } = $props();
</script>

<div class="md:px-4 lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col justify-between py-4 md:gap-4 md:py-8 lg:flex-row lg:gap-8 lg:py-12"
  >
    <main class="lg:w-8/12">
      <section class="flex flex-col gap-4 p-4 md:bg-base-200 md:p-8">
        <h2 class="text-lg font-bold uppercase">{m.categories_title()}</h2>
        <ul class="grid gap-4 sm:grid-cols-2">
          {#each Object.entries(filteredCategories) as [categoryId, category] (categoryId)}
            <li class="contents">
              <svelte:element
                this={category.url ? 'a' : 'div'}
                class={[
                  'group @container flex h-20 items-stretch bg-primary text-primary-content',
                  !category.url && 'select-none',
                ]}
                href={category.url}
                title={category.url ? category.name : undefined}
              >
                <span
                  class="flex grow flex-col justify-center p-4 @sm:flex-row @sm:items-center @sm:justify-start @sm:gap-1 @sm:px-6"
                >
                  <span class="flex items-center gap-1 uppercase">
                    <span class="mb-1 {category.icon}"></span>
                    {category.name}
                  </span>
                  {#if !category.url}
                    <span class="text-xs">
                      ({m.general_coming_soon()})
                    </span>
                  {/if}
                </span>
                <span class="relative">
                  <img
                    class={[
                      'h-full w-24 object-cover object-center @xs:w-32',
                      !category.url &&
                        'brightness-60 contrast-more:brightness-100',
                    ]}
                    src={category.image}
                    alt={m.home_category_banner({ category: category.name })}
                    loading="lazy"
                  />
                  {#if category.url}
                    <span
                      class="invisible absolute inset-0 z-10 flex w-0 items-center justify-center gap-1 overflow-hidden bg-secondary text-sm font-bold text-secondary-content uppercase transition-all group-hover:visible group-hover:w-full motion-reduce:transition-none"
                    >
                      {m.general_open()}
                      <span class="mb-1 iconify famicons--open-sharp"></span>
                    </span>
                  {/if}
                </span>
              </svelte:element>
            </li>
          {/each}
        </ul>
      </section>
    </main>
    <aside class="lg:w-4/12">
      <section class="flex flex-col gap-4 p-4 md:bg-base-200 md:p-8">
        <h2 class="text-lg font-bold uppercase">
          {m.home_recent_visits_title()}
        </h2>
        <div
          class="flex h-40 items-center justify-center bg-base-200 text-center text-sm text-base-content/60 italic select-none contrast-more:text-base-content md:bg-base-300"
        >
          {m.general_coming_soon()}
        </div>
        <!-- <ul class="menu w-full bg-base-200 md:bg-base-300">
          {#each data.recentVisits as recentVisit (recentVisit.name)}
            <li>
              <a href={recentVisit.url} title={recentVisit.name}>
                {recentVisit.name}
              </a>
            </li>
          {/each}
        </ul> -->
      </section>
    </aside>
  </div>
</div>
