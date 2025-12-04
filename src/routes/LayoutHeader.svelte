<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import BrandIcon from '$lib/assets/images/brand/icon.svg';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

  let { id, variant, backData, detailTitle, children } = $props();

  const variants = ['home', 'detail'];

  $effect(() => {
    if (!variants.includes(variant)) {
      variant = variants[0];
    }
  });

  let windowInnerWidth = $state();

  let isMenuSidebarShown = $state(false);
  let isSearchSidebarShown = $state(false);
  const menuSidebarToggleLabel = $derived(
    `${isMenuSidebarShown ? m.general_close() : m.general_open()} Menu`
  );
  const searchSidebarToggleLabel = $derived(
    `${isSearchSidebarShown ? m.general_close() : m.general_open()} ${m.header_search_title()}`
  );

  $effect(() => {
    page.url.pathname;
    isMenuSidebarShown = false;
    isSearchSidebarShown = false;
  });

  const defaultCategories = [
    {
      name: m.categories_agents(),
      url: '/agents',
      icon: 'famicons--people-sharp',
    },
    {
      name: m.categories_maps(),
      url: '/maps',
      icon: 'famicons--map-sharp',
    },
    {
      name: m.categories_weapons(),
      url: '/weapons',
      icon: 'famicons--build-sharp',
    },
  ];

  const categories = $derived.by(() => {
    let computedCategories = defaultCategories;

    if (variant === 'detail' && windowInnerWidth < 1024) {
      computedCategories = [
        {
          name: m.categories_home(),
          url: '/',
          icon: 'famicons--home-sharp',
        },
        ...computedCategories,
      ];
    }

    return computedCategories;
  });
  const themes = [
    {
      id: 'light',
      name: m.header_themes_light(),
      icon: 'famicons--sunny-sharp',
    },
    {
      id: 'dark',
      name: m.header_themes_dark(),
      icon: 'famicons--moon-sharp',
    },
    {
      id: null,
      name: m.header_themes_system(),
      icon: 'famicons--desktop-sharp',
    },
  ];
  const languages = [
    {
      id: 'en',
      name: 'English',
      icon: 'circle-flags--gb',
    },
    {
      id: 'id',
      name: 'Bahasa Indonesia',
      icon: 'circle-flags--id',
    },
  ];

  let activeThemeId = $state();
  let activeLanguageId = $state();
  const activeTheme = $derived(
    themes.find((theme) => theme.id === activeThemeId)
  );
  const activeLanguage = $derived(
    languages.find((language) => language.id === activeLanguageId)
  );
  let searchQuery = $state('');

  function handleRefreshingTheme({ detail: { localStorageTheme } }) {
    activeThemeId = localStorageTheme;
  }

  onMount(() => {
    activeThemeId = window.theme.theme.localStorageTheme;
    activeLanguageId = getLocale();

    window.theme.addEventListener('refresh', handleRefreshingTheme);

    return () => {
      window.theme.removeEventListener('refresh', handleRefreshingTheme);
    };
  });
</script>

<svelte:window bind:innerWidth={windowInnerWidth} />

<div class={['drawer', variant === 'detail' && 'drawer-end']}>
  <input
    class="drawer-toggle invisible"
    id="{id}-menu-sidebar-checkbox"
    type="checkbox"
    bind:checked={isMenuSidebarShown}
  />
  <div class="drawer-content">
    <div class="drawer drawer-end">
      <input
        class="drawer-toggle invisible"
        id="{id}-search-sidebar-checkbox"
        type="checkbox"
        bind:checked={isSearchSidebarShown}
      />
      <div
        class="drawer-content flex min-h-dvh flex-col"
        inert={isMenuSidebarShown || isSearchSidebarShown}
      >
        <header
          class={[
            '@container p-0 max-lg:navbar lg:bg-base-200 lg:text-base-content',
            variant === 'home' && 'bg-primary text-primary-content',
          ]}
        >
          <div
            class="max-lg:navbar-start lg:bg-primary lg:text-primary-content"
          >
            {#if variant === 'home'}
              <button
                class="btn btn-square h-16 border-none bg-transparent btn-ghost btn-xl hover:bg-primary-content/20 lg:hidden"
                type="button"
                aria-controls="{id}-menu-sidebar-checkbox"
                aria-expanded={isMenuSidebarShown}
                aria-label={menuSidebarToggleLabel}
                title={menuSidebarToggleLabel}
                onclick={() => (isMenuSidebarShown = true)}
              >
                <span
                  class="iconify text-3xl text-primary-content famicons--menu-sharp"
                ></span>
              </button>
            {:else}
              <a
                class="btn btn-square h-16 border-none btn-ghost btn-xl lg:hidden"
                href={backData?.url || '/'}
                aria-label={backData?.label || m.general_back()}
                title={backData?.label || m.general_back()}
              >
                <span class="iconify text-3xl famicons--arrow-back-sharp"
                ></span>
              </a>
            {/if}
            <div
              class="mx-auto hidden w-full max-w-324 lg:flex lg:justify-between lg:gap-4"
            >
              <nav aria-label={m.header_desktop_navigation()}>
                <ul class="menu menu-horizontal p-0">
                  {#each categories as category (category.name)}
                    <li>
                      <a
                        class="gap-1 px-2 hover:bg-primary-content/20 focus:bg-primary-content/40 focus:text-primary-content active:bg-primary-content/40"
                        href={category.url}
                        title={category.name}
                      >
                        <span class={['mb-1 iconify', category.icon]}></span>
                        {category.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              </nav>
              <ul class="menu menu-horizontal p-0">
                <li class="dropdown dropdown-end">
                  <div
                    class="gap-1 px-2 hover:bg-primary-content/20 focus:bg-primary-content/40 focus:text-primary-content active:bg-primary-content/40"
                    role="button"
                    tabindex="0"
                    title={m.header_themes_choose()}
                  >
                    <span
                      class={[
                        'mb-1 iconify',
                        activeTheme?.icon || 'famicons--square-sharp',
                      ]}
                    ></span>
                    <span>
                      <b>{m.header_themes_title()}:</b>
                      {activeTheme?.name || `${m.general_loading()} ....`}
                    </span>
                  </div>
                  <ul
                    class="dropdown-content menu bg-base-300 text-base-content"
                    tabindex="-1"
                  >
                    {#each themes as theme (theme.name)}
                      <li>
                        <button
                          class="gap-1 px-2 text-nowrap hover:bg-base-content/5 focus:bg-base-content/10 active:bg-primary-content/10"
                          type="button"
                          title={theme.name}
                          onclick={() => {
                            window.theme.theme = theme.id;
                            document.activeElement.blur();
                          }}
                        >
                          <span class={['mb-1 iconify', theme.icon]}></span>
                          {theme.name}
                        </button>
                      </li>
                    {/each}
                  </ul>
                </li>
                <li class="dropdown dropdown-end">
                  <div
                    class="gap-1 px-2 hover:bg-primary-content/20 focus:bg-primary-content/40 focus:text-primary-content active:bg-primary-content/40"
                    role="button"
                    tabindex="0"
                    title={m.header_languages_choose()}
                  >
                    <span
                      class={[
                        'mb-1 iconify-color',
                        activeLanguage?.icon || 'circle-flags--xx',
                      ]}
                    ></span>
                    <span>
                      <b>{m.header_languages_title()}:</b>
                      {activeLanguage?.name || `${m.general_loading()} ....`}
                    </span>
                  </div>
                  <ul
                    class="dropdown-content menu bg-base-300 text-base-content"
                    tabindex="-1"
                  >
                    {#each languages as language (language.name)}
                      <li>
                        <button
                          class="gap-1 px-2 text-nowrap hover:bg-base-content/5 focus:bg-base-content/10 active:bg-primary-content/10"
                          type="button"
                          title={language.name}
                          onclick={() => {
                            setLocale(language.id);
                            document.activeElement.blur();
                          }}
                        >
                          <span class={['mb-1 iconify-color', language.icon]}
                          ></span>
                          {language.name}
                        </button>
                      </li>
                    {/each}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="max-lg:contents lg:hero lg:px-12">
            <div
              class="w-full justify-between max-lg:contents lg:hero-content lg:max-w-7xl lg:gap-4 lg:px-0 lg:py-8 xl:py-10"
            >
              <div class="max-lg:navbar-center">
                <a
                  class={[
                    'flex items-center gap-2 lg:gap-4',
                    variant === 'detail' && 'max-lg:hidden',
                  ]}
                  href="/"
                  title="Dismantled Spike"
                >
                  <span
                    class="aspect-689/1024 h-6 bg-primary-content lg:h-8 lg:bg-base-content"
                    style:mask={`url("${BrandIcon}") no-repeat
                    center`}
                  ></span>
                  <svelte:element
                    this={page.url.pathname === '/' ? 'h1' : 'h2'}
                    class="font-brand text-2xl lg:text-4xl lg:text-primary lg:text-shadow-[-2px_-2px_0_var(--color-base-content),2px_-2px_0_var(--color-base-content),-2px_2px_0_var(--color-base-content),2px_2px_0_var(--color-base-content)]"
                  >
                    <span
                      class="contents @sm:hidden"
                      aria-label="Dismantled Spike"
                    >
                      DS
                    </span>
                    <span class="hidden @sm:contents">Dismantled Spike</span>
                  </svelte:element>
                </a>
                {#if variant === 'detail'}
                  <h2 class="font-extrabold uppercase lg:hidden">
                    {detailTitle}
                  </h2>
                {/if}
              </div>
              <div class="max-lg:navbar-end">
                <button
                  class={[
                    'btn btn-square h-16 border-none btn-ghost btn-xl lg:hidden',
                    variant === 'home' &&
                      'bg-transparent hover:bg-primary-content/20',
                  ]}
                  type="button"
                  aria-controls="{id}-search-sidebar-checkbox"
                  aria-expanded={isSearchSidebarShown}
                  aria-label={searchSidebarToggleLabel}
                  title={searchSidebarToggleLabel}
                  onclick={() => (isSearchSidebarShown = true)}
                >
                  <span
                    class={[
                      'iconify text-3xl famicons--search-sharp',
                      variant === 'home' && 'text-primary-content',
                    ]}
                  ></span>
                </button>
                {#if variant === 'detail'}
                  <button
                    class="btn btn-square h-16 border-none btn-ghost btn-xl lg:hidden"
                    type="button"
                    aria-controls="{id}-menu-sidebar-checkbox"
                    aria-expanded={isMenuSidebarShown}
                    aria-label={menuSidebarToggleLabel}
                    title={menuSidebarToggleLabel}
                    onclick={() => (isMenuSidebarShown = true)}
                  >
                    <span class="iconify text-3xl famicons--menu-sharp"></span>
                  </button>
                {/if}
                <label
                  class="input input-lg hidden w-full min-w-md bg-base-300 lg:flex"
                  title={m.header_search_title()}
                >
                  <span class="iconify famicons--search-sharp"></span>
                  <input
                    type="search"
                    name="{id}-search-mobile"
                    placeholder="{m.header_search_placeholder()} ...."
                    bind:value={searchQuery}
                  />
                </label>
              </div>
            </div>
          </div>
        </header>
        {@render children?.()}
      </div>
      <div class="drawer-side">
        <label
          class="drawer-overlay cursor-default"
          for="{id}-search-sidebar-checkbox"
          aria-label={searchSidebarToggleLabel}
        >
        </label>
        <div
          class="flex min-h-full w-full max-w-160 flex-col gap-6 bg-base-200"
        >
          <button
            class="btn min-h-16 justify-start border-b-2 border-b-base-content/5 text-left"
            type="button"
            title={searchSidebarToggleLabel}
            onclick={() => (isSearchSidebarShown = false)}
          >
            <span class="mb-1 iconify text-lg famicons--close-sharp"></span>
            {m.general_close()}
            {m.header_search_title()}
          </button>
          <div class="px-4">
            <label
              class="input input-lg w-full bg-transparent"
              title={m.header_search_title()}
            >
              <span class="iconify famicons--search-sharp"></span>
              <input
                type="search"
                name="{id}-search-mobile"
                placeholder="{m.header_search_placeholder()} ...."
                bind:value={searchQuery}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="drawer-side">
    <label
      class="drawer-overlay cursor-default"
      for="{id}-menu-sidebar-checkbox"
      aria-label={menuSidebarToggleLabel}
    >
    </label>
    <div class="flex min-h-full w-full max-w-160 flex-col gap-6 bg-base-200">
      <button
        class="btn min-h-16 justify-start border-b-2 border-b-base-content/5 text-left"
        type="button"
        title={menuSidebarToggleLabel}
        onclick={() => (isMenuSidebarShown = false)}
      >
        <span class="mb-1 iconify text-lg famicons--close-sharp"></span>
        {m.general_close()} Menu
      </button>
      <div class="flex flex-col gap-2">
        <h3 class="px-4 text-sm font-bold uppercase">{m.categories_title()}</h3>
        <nav aria-label={m.header_mobile_navigation()}>
          <ul class="menu w-full bg-base-300 p-0">
            {#each categories as category (category.name)}
              <li>
                <a class="p-4" href={category.url} title={category.name}>
                  <span class={['mb-1 iconify', category.icon]}></span>
                  {category.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="px-4 text-sm font-bold uppercase">
          {m.header_settings()}
        </h3>
        <ul class="menu w-full bg-base-300 p-0">
          <li>
            <details>
              <summary class="p-4" title={m.header_themes_choose()}>
                <span
                  class={[
                    'mb-1 iconify',
                    activeTheme?.icon || 'famicons--square-sharp',
                  ]}
                ></span>
                <span>
                  <b>Theme:</b>
                  {activeTheme?.name || `${m.general_loading()} ....`}
                </span>
              </summary>
              <ul>
                {#each themes as theme (theme.name)}
                  <li>
                    <button
                      class="p-4"
                      type="button"
                      title={theme.name}
                      onclick={() => (window.theme.theme = theme.id)}
                    >
                      <span class={['mb-1 iconify', theme.icon]}></span>
                      {theme.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary class="p-4" title={m.header_languages_choose()}>
                <span
                  class={[
                    'mb-1 iconify-color',
                    activeLanguage?.icon || 'circle-flags--xx',
                  ]}
                ></span>
                <span>
                  <b>{m.header_languages_title()}:</b>
                  {activeLanguage?.name || `${m.general_loading()} ....`}
                </span>
              </summary>
              <ul>
                {#each languages as language (language.name)}
                  <li>
                    <button
                      class="p-4"
                      type="button"
                      title={language.name}
                      onclick={() => setLocale(language.id)}
                    >
                      <span class={['mb-1 iconify-color', language.icon]}
                      ></span>
                      {language.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
