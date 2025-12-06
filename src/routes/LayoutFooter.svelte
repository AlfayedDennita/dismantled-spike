<script>
  import BrandIcon from '$lib/assets/images/brand/icon.svg';
  import { m } from '$lib/paraglide/messages';

  const { variant } = $props();

  let windowScrollY = $state();

  const firstBuildYear = 2025;
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    currentYear === firstBuildYear
      ? currentYear
      : `${firstBuildYear}\u2013${currentYear}`;
</script>

<svelte:window bind:scrollY={windowScrollY} />

{#snippet externalLink(url, text)}
  <a
    class="font-bold text-primary/50 underline decoration-transparent transition-colors hover:text-primary hover:decoration-primary motion-reduce:transition-none contrast-more:text-primary contrast-more:hover:text-primary dark:text-primary/80"
    href={url}
    rel="external"
    target="_blank"
    title={text}
  >
    {text}
  </a>
{/snippet}

<footer
  class={[
    'mt-auto bg-base-200 p-8 text-base-content md:py-12 lg:px-12',
    variant === 'detail' && 'max-md:hidden',
  ]}
>
  <div
    class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row md:items-end"
  >
    <div
      class="flex flex-col items-center gap-8 text-center md:w-1/2 md:items-start md:gap-4 md:text-left"
    >
      <div class="flex items-center gap-2 select-none md:gap-4">
        <span
          class="aspect-689/1024 h-6 bg-base-content/30 contrast-more:bg-base-content"
          style:mask={`url("${BrandIcon}") no-repeat center`}
        ></span>
        <h3
          class="font-brand text-2xl text-base-content/30 contrast-more:text-base-content"
        >
          Dismantled Spike
        </h3>
      </div>
      <div
        class="flex flex-col items-center gap-2 text-sm text-pretty text-base-content/40 contrast-more:text-base-content md:items-start"
      >
        <p>
          {@html m.footer_copyright({ year: copyrightYear })}
        </p>
        <p>
          <b>Dismantled Spike</b>
          {m.footer_description()}
        </p>
        <p>
          {m.footer_riot_copyright()}
        </p>
      </div>
    </div>
    <aside
      class="flex flex-col items-center justify-end gap-1 text-center text-sm text-base-content/40 contrast-more:text-base-content md:w-1/2 md:items-end md:text-right xl:flex-row"
    >
      <p>
        {m.footer_app_developed_by()}
        {@render externalLink(
          'https://alfayeddennita.github.io',
          'Alfayed Dennita'
        )}
      </p>
      <span class="hidden xl:block">-</span>
      <p>
        {m.footer_data_provided_by()}
        {@render externalLink('https://valorant-api.com', 'Valorant-API')}
      </p>
      <button
        class="btn mt-2 btn-soft btn-xs xl:mt-0 xl:ml-2"
        type="button"
        title={m.footer_back_to_top()}
        onclick={() => (windowScrollY = 0)}
      >
        <span class="mb-0.5 iconify famicons--arrow-up-sharp"></span>
        {m.footer_back_to_top()}
      </button>
    </aside>
  </div>
</footer>
