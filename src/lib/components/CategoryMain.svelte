<script>
  const { title, children } = $props();
</script>

<main class="px-4 lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col gap-8 pt-8 pb-12 lg:gap-12 lg:py-16"
  >
    <h1
      class="text-center text-2xl font-bold uppercase lg:text-3xl lg:font-extrabold"
    >
      {title}
    </h1>
    <div class="flex flex-wrap justify-center gap-8">
      {@render children?.()}
    </div>
  </div>
</main>
