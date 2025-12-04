<script>
  import { m } from '$lib/paraglide/messages.js';

  const { data } = $props();
</script>

<div class="md:px-4 lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col justify-between py-4 md:gap-4 md:py-8 lg:flex-row lg:gap-8 lg:py-12"
  >
    <main class="lg:w-8/12">
      <section class="flex flex-col gap-4 p-4 md:bg-base-200 md:p-8">
        <h3 class="text-lg font-bold uppercase">{m.categories_title()}</h3>
        <ul class="grid gap-4 sm:grid-cols-2">
          {#each data.categories as category (category.name)}
            <li class="contents">
              <svelte:element
                this={category.url ? 'a' : 'div'}
                class={[
                  'group @container flex h-20 items-stretch bg-primary contrast-more:text-primary-content',
                  category.url
                    ? 'text-primary-content'
                    : 'text-primary-content/60',
                  !category.url && 'select-none',
                ]}
                href={category.url}
                title={category.url ? category.name : undefined}
              >
                <span
                  class="flex grow flex-col justify-center p-4 @sm:flex-row @sm:items-center @sm:justify-start @sm:gap-1 @sm:px-6"
                >
                  <span class="flex items-center gap-1 uppercase">
                    <span class={['mb-1 iconify', category.icon]}></span>
                    {category.name}
                  </span>
                  {#if !category.url}
                    <span
                      class="text-xs text-primary-content/40 italic contrast-more:text-primary-content"
                      >({m.categories_coming_soon()})</span
                    >
                  {/if}
                </span>
                <span class="relative">
                  <img
                    class="h-full w-24 object-cover object-center @xs:w-32"
                    src={category.image}
                    alt={category.name}
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
        <h3 class="text-lg font-bold uppercase">
          {m.home_recent_visits_title()}
        </h3>
        <ul class="menu w-full bg-base-200 md:bg-base-300">
          {#each data.recentVisits as recentVisit (recentVisit.name)}
            <li>
              <a href={recentVisit.url} title={recentVisit.name}>
                {recentVisit.name}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    </aside>
  </div>
</div>
