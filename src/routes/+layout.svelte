<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import './layout.css';

  const { children } = $props();

  const { title, description, keywords } = $derived(page.data.metadata);
  let theme = $state();

  function handleRefreshingTheme({ detail: { localStorageTheme } }) {
    theme = localStorageTheme;
  }

  onMount(() => {
    theme = window.theme.theme.localStorageTheme;
    window.theme.addEventListener('refresh', handleRefreshingTheme);

    return () => {
      window.theme.removeEventListener('refresh', handleRefreshingTheme);
    };
  });
</script>

<svelte:head>
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if keywords}
    <meta name="keywords" content={Array.from(new Set(keywords)).join(', ')} />
  {/if}
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<p>Theme: {theme || 'System Preference'}</p>
<button
  class="btn btn-primary"
  type="button"
  onclick={() => (window.theme.theme = 'light')}
>
  Change to Light
</button>
<button
  class="btn btn-secondary"
  type="button"
  onclick={() => (window.theme.theme = 'dark')}
>
  Change to Dark
</button>
<button
  class="btn btn-accent"
  type="button"
  onclick={() => (window.theme.theme = null)}
>
  Change to System Preference
</button>
<a class="btn btn-neutral" href="/demo">Demo</a>

{@render children()}
