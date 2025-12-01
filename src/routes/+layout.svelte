<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import './layout.css';
  import LayoutFooter from './LayoutFooter.svelte';
  import LayoutHeader from './LayoutHeader.svelte';

  const { children } = $props();

  const { title, description, keywords } = $derived(page.data.metadata);
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

<LayoutHeader
  variant={page.data.layout.variant}
  backData={page.data.layout.backData}
  detailTitle={page.data.layout.title}
>
  {@render children()}
  <LayoutFooter variant={page.data.layout.variant} />
</LayoutHeader>
