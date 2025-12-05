<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import './layout.css';
  import LayoutFooter from './LayoutFooter.svelte';
  import LayoutHeader from './LayoutHeader.svelte';

  const { children } = $props();

  const { title, description, keywords, image } = $derived(page.data.metadata);
</script>

<svelte:head>
  <meta property="og:url" content={page.url.href} />
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  {/if}
  {#if keywords}
    <meta name="keywords" content={Array.from(new Set(keywords)).join(', ')} />
  {/if}
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  {#if title}
    <meta property="og:title" content={title} />
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
