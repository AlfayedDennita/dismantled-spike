<script>
  const { data } = $props();

  const categoryIcons = {
    Melee: 'game-icons--butterfly-knife',
    Sidearm: 'game-icons--pistol-gun',
    SMG: 'game-icons--mp5',
    Shotgun: 'game-icons--sawed-off-shotgun',
    Rifle: 'game-icons--ak47',
    Sniper: 'game-icons--reticule',
    Heavy: 'game-icons--minigun',
  };
</script>

<main class="px-4 lg:px-12">
  <div class="mx-auto flex max-w-7xl flex-col gap-8 py-8 lg:gap-12 lg:py-16">
    <h1
      class="text-center text-2xl font-bold uppercase lg:text-3xl lg:font-extrabold"
    >
      Weapons
    </h1>
    <div class="flex flex-wrap justify-center gap-8">
      {#each data.weapons as weapon (weapon.id)}
        <article
          class="card grow bg-base-200 sm:max-w-[calc(100%/2-var(--spacing)*8/2)] lg:max-w-[calc(100%/3-var(--spacing)*16/3)] xl:max-w-[calc(100%/4-var(--spacing)*24/4)]"
        >
          <a class="group" href="/weapons/{weapon.id}" title={weapon.name}>
            <figure class="relative h-60">
              <img
                class="aspect-2/1 w-full object-contain object-center p-4"
                src={weapon.images.display}
                alt={weapon.name}
              />
              <div
                class="absolute inset-x-0 -bottom-full flex h-full items-center justify-center overflow-hidden bg-primary transition-[bottom] group-hover:bottom-0 motion-reduce:transition-none"
              >
                <img
                  class="aspect-2/1 w-full object-contain object-center p-4"
                  src={weapon.images.flat}
                  alt="{weapon.name} Flat"
                />
              </div>
              <figcaption
                class="absolute bottom-4 left-4 badge transition-opacity badge-primary group-hover:opacity-0 motion-reduce:transition-none"
              >
                <span class="mb-0.5 iconify {categoryIcons[weapon.category]}"
                ></span>
                {weapon.category}
              </figcaption>
            </figure>
            <div class="card-body bg-primary text-primary-content">
              <h2 class="card-title text-xl uppercase">
                {weapon.name}
              </h2>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</main>
