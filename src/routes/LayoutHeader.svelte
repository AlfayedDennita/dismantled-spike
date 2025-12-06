<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import BrandIcon from '$lib/assets/images/brand/icon.svg';
  import { m } from '$lib/paraglide/messages';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import { enabledCategories } from '$lib/utils/categories';
  import languages from '$lib/utils/languages';
  import themes from '$lib/utils/themes';

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

  const { home: _home, ...filteredCategories } = enabledCategories;
  const displayCategories = $derived.by(() => {
    if (variant === 'detail' && windowInnerWidth < 1024) {
      return enabledCategories;
    } else {
      return filteredCategories;
    }
  });

  let activeThemeId = $state();
  let activeLanguageId = $state();
  const activeTheme = $derived(
    themes[activeThemeId !== null ? activeThemeId : 'system']
  );
  const activeLanguage = $derived(languages[activeLanguageId]);
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

{#snippet openSidebarButton({ controls, expanded, label, onclick, icon })}
  <button
    class={[
      'btn btn-square h-16 border-none btn-ghost btn-xl lg:hidden',
      variant === 'home' && 'bg-transparent hover:bg-primary-content/20',
    ]}
    type="button"
    aria-controls={controls}
    aria-expanded={expanded}
    aria-label={label}
    title={label}
    {onclick}
  >
    <span
      class={[`text-3xl ${icon}`, variant === 'home' && 'text-primary-content']}
    ></span>
  </button>
{/snippet}

{#snippet closeSidebarButton({ title, onclick, text })}
  <button
    class="btn min-h-16 justify-start border-b-2 border-b-base-content/5 text-left"
    type="button"
    {title}
    {onclick}
  >
    <span class="mb-1 iconify text-lg famicons--close-sharp"></span>
    {text}
  </button>
{/snippet}

{#snippet mobileDropdown({
  title,
  activeIcon,
  activeTitle,
  activeOption,
  options,
  onclickOption,
})}
  <li>
    <details>
      <summary class="p-4" {title}>
        <span class="mb-1 {activeIcon}"></span>
        <span>
          <b>{activeTitle}:</b>
          {activeOption || `${m.general_loading()} ....`}
        </span>
      </summary>
      <ul>
        {#each Object.entries(options) as [optionId, option] (optionId)}
          <li>
            <button
              class="p-4"
              type="button"
              title={option.name}
              onclick={() => onclickOption(optionId)}
            >
              <span class="mb-1 {option.icon}"></span>
              {option.name}
            </button>
          </li>
        {/each}
      </ul>
    </details>
  </li>
{/snippet}

{#snippet desktopDropdown({
  title,
  activeIcon,
  activeTitle,
  activeOption,
  options,
  onclickOption,
})}
  <li class="dropdown dropdown-end">
    <div
      class="gap-1 px-2 hover:bg-primary-content/20 focus:bg-primary-content/40 focus:text-primary-content active:bg-primary-content/40"
      role="button"
      tabindex="0"
      {title}
    >
      <span class="mb-1 {activeIcon}"></span>
      <span>
        <b>{activeTitle}:</b>
        {activeOption || `${m.general_loading()} ....`}
      </span>
    </div>
    <ul
      class="dropdown-content menu bg-base-300 text-base-content"
      tabindex="-1"
    >
      {#each Object.entries(options) as [optionId, option] (optionId)}
        <li>
          <button
            class="gap-1 px-2 text-nowrap hover:bg-base-content/5 focus:bg-base-content/10 active:bg-primary-content/10"
            type="button"
            title={option.name}
            onclick={() => {
              onclickOption(optionId);
              document.activeElement.blur();
            }}
          >
            <span class="mb-1 {option.icon}"></span>
            {option.name}
          </button>
        </li>
      {/each}
    </ul>
  </li>
{/snippet}

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
        class="relative drawer-content flex min-h-dvh flex-col"
        inert={isMenuSidebarShown || isSearchSidebarShown}
      >
        <header
          class="@container sticky inset-x-0 top-0 z-40 p-0 shadow-sm max-lg:navbar lg:static lg:bg-base-200 lg:text-base-content lg:shadow-none {variant ===
          'home'
            ? 'bg-primary text-primary-content'
            : 'bg-base-100'}"
        >
          <div
            class={[
              'max-lg:navbar-start lg:bg-primary lg:text-primary-content',
              variant === 'detail' && 'w-auto',
            ]}
          >
            {#if variant === 'home'}
              {@render openSidebarButton({
                controls: `${id}-menu-sidebar-checkbox`,
                expanded: isMenuSidebarShown,
                label: menuSidebarToggleLabel,
                onclick: () => (isMenuSidebarShown = true),
                icon: 'iconify famicons--menu-sharp',
              })}
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
              <div class="hidden size-16 @sm:block" aria-hidden="true"></div>
            {/if}
            <div
              class="mx-auto hidden w-full max-w-324 lg:flex lg:justify-between lg:gap-4"
            >
              <nav aria-label={m.header_desktop_navigation()}>
                <ul class="menu menu-horizontal p-0">
                  {#each Object.entries(filteredCategories) as [categoryId, category] (categoryId)}
                    <li>
                      <a
                        class="gap-1 px-2 hover:bg-primary-content/20 focus:bg-primary-content/40 focus:text-primary-content active:bg-primary-content/40"
                        href={category.url}
                        title={category.name}
                      >
                        <span class="mb-1 {category.icon}"></span>
                        {category.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              </nav>
              <ul class="menu menu-horizontal p-0">
                {@render desktopDropdown({
                  title: m.header_themes_choose(),
                  activeIcon:
                    activeTheme?.icon || 'iconify famicons--square-sharp',
                  activeTitle: m.header_themes_title(),
                  activeOption: activeTheme?.name,
                  options: themes,
                  onclickOption: (themeId) =>
                    (window.theme.theme =
                      themeId !== 'system' ? themeId : null),
                })}
                {@render desktopDropdown({
                  title: m.header_languages_choose(),
                  activeIcon:
                    activeLanguage?.icon || 'iconify-color circle-flags--xx',
                  activeTitle: m.header_languages_title(),
                  activeOption: activeLanguage?.name,
                  options: languages,
                  onclickOption: (languageId) => setLocale(languageId),
                })}
              </ul>
            </div>
          </div>
          <div class="max-lg:contents lg:hero lg:px-12">
            <div
              class="w-full justify-between max-lg:contents lg:hero-content lg:max-w-7xl lg:gap-4 lg:px-0 lg:py-8 xl:py-10"
            >
              <div
                class={[
                  'max-lg:navbar-center',
                  variant === 'detail' && 'w-full flex-1',
                ]}
              >
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
                    style:mask={`url("${BrandIcon}") no-repeat center`}
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
                  <h2
                    class="line-clamp-1 w-full text-center font-extrabold text-ellipsis uppercase lg:hidden"
                  >
                    {detailTitle}
                  </h2>
                {/if}
              </div>
              <div
                class={['max-lg:navbar-end', variant === 'detail' && 'w-auto']}
              >
                {@render openSidebarButton({
                  controls: `${id}-search-sidebar-checkbox`,
                  expanded: isSearchSidebarShown,
                  label: searchSidebarToggleLabel,
                  onclick: () => (isSearchSidebarShown = true),
                  icon: 'iconify famicons--search-sharp',
                })}
                {#if variant === 'detail'}
                  {@render openSidebarButton({
                    controls: `${id}-menu-sidebar-checkbox`,
                    expanded: isMenuSidebarShown,
                    label: menuSidebarToggleLabel,
                    onclick: () => (isMenuSidebarShown = true),
                    icon: 'iconify famicons--menu-sharp',
                  })}
                {/if}
                <label
                  class="input input-lg hidden w-full min-w-md bg-base-300 lg:flex"
                  title={m.header_search_title()}
                >
                  <span class="iconify famicons--search-sharp"></span>
                  <input
                    type="search"
                    name="{id}-search-desktop"
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
      <div class="drawer-side z-50">
        <label
          class="drawer-overlay cursor-default"
          for="{id}-search-sidebar-checkbox"
          aria-label={searchSidebarToggleLabel}
        >
        </label>
        <div
          class="flex min-h-full w-full max-w-160 flex-col gap-6 bg-base-200"
        >
          {@render closeSidebarButton({
            title: searchSidebarToggleLabel,
            onclick: () => (isSearchSidebarShown = false),
            text: `${m.general_close()} ${m.header_search_title()}`,
          })}
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
  <div class="drawer-side z-50">
    <label
      class="drawer-overlay cursor-default"
      for="{id}-menu-sidebar-checkbox"
      aria-label={menuSidebarToggleLabel}
    >
    </label>
    <div class="flex min-h-full w-full max-w-160 flex-col gap-6 bg-base-200">
      {@render closeSidebarButton({
        title: menuSidebarToggleLabel,
        onclick: () => (isMenuSidebarShown = false),
        text: `${m.general_close()} Menu`,
      })}
      <div class="flex flex-col gap-2">
        <h3 class="px-4 text-sm font-bold uppercase">{m.categories_title()}</h3>
        <nav aria-label={m.header_mobile_navigation()}>
          <ul class="menu w-full bg-base-300 p-0">
            {#each Object.entries(displayCategories) as [categoryId, category] (categoryId)}
              <li>
                <a class="p-4" href={category.url} title={category.name}>
                  <span class="mb-1 {category.icon}"></span>
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
          {@render mobileDropdown({
            title: m.header_themes_choose(),
            activeIcon: activeTheme?.icon || 'iconify famicons--square-sharp',
            activeTitle: m.header_themes_title(),
            activeOption: activeTheme?.name,
            options: themes,
            onclickOption: (themeId) =>
              (window.theme.theme = themeId !== 'system' ? themeId : null),
          })}
          {@render mobileDropdown({
            title: m.header_languages_choose(),
            activeIcon:
              activeLanguage?.icon || 'iconify-color circle-flags--xx',
            activeTitle: m.header_languages_title(),
            activeOption: activeLanguage?.name,
            options: languages,
            onclickOption: (languageId) => setLocale(languageId),
          })}
        </ul>
      </div>
    </div>
  </div>
</div>
