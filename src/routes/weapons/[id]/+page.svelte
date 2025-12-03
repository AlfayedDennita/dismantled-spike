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

  const displayCost = $derived.by(() => {
    if (data.weapon.cost === 1) {
      return `${data.weapon.cost} Credit`;
    } else if (data.weapon.cost > 1) {
      return `${data.weapon.cost} Credits`;
    } else {
      return 'Free';
    }
  });
  const displayFireMode = {
    SemiAutomatic: 'Semi-Automatic',
  };
  const displayFeature = {
    Silenced: 'Silenced',
    DualZoom: 'Dual Zoom',
    ROFIncrease: 'Rate of Fire Increase',
  };
  const displayAltFireType = {
    ADS: 'ADS',
    AirBurst: 'Air Burst',
    Shotgun: 'Shotgun',
  };

  const generalStats = [
    {
      id: 'fireMode',
      name: 'Fire Mode',
      icon: 'game-icons--duel',
      check: (stats) => typeof stats.fireMode === 'string',
      value: (stats) => displayFireMode[stats.fireMode],
    },
    {
      id: 'feature',
      name: 'Feature',
      icon: 'famicons--sparkles-sharp',
      check: (stats) => typeof stats.feature === 'string',
      value: (stats) => displayFeature[stats.feature],
    },
    {
      id: 'wallPenetration',
      name: 'Wall Penetration',
      icon: 'game-icons--supersonic-bullet',
      check: (stats) => typeof stats.wallPenetration === 'string',
      value: (stats) => stats.wallPenetration,
    },
    {
      id: 'magazineSize',
      name: 'Magazine Size',
      icon: 'game-icons--machine-gun-magazine',
      check: (stats) => typeof stats.magazineSize === 'number',
      value: (stats) =>
        `${stats.magazineSize} round${stats.magazineSize > 1 ? 's' : ''}`,
    },
    {
      id: 'shotgunPelletCount',
      name: 'Pellet Count',
      icon: 'game-icons--shotgun-rounds',
      check: (stats) => stats.shotgunPelletCount > 1,
      value: (stats) =>
        `${stats.shotgunPelletCount} pellet${stats.shotgunPelletCount > 1 ? 's' : ''}`,
    },
    {
      id: 'fireRate',
      name: 'Fire Rate',
      icon: 'game-icons--silver-bullet',
      check: (stats) => typeof stats.fireRate === 'number',
      value: (stats) => `${parseFloat(stats.fireRate.toFixed(2))} rounds/s`,
    },
    {
      id: 'firstBulletAccuracy',
      name: 'First Bullet Miss',
      icon: 'game-icons--targeting',
      check: (stats) => typeof stats.firstBulletAccuracy === 'number',
      value: (stats) =>
        `${stats.firstBulletAccuracy > 0 ? parseFloat((stats.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
    },
    {
      id: 'runSpeedMultiplier',
      name: 'Run Speed Multiplier',
      icon: 'game-icons--run',
      check: (stats) => typeof stats.runSpeedMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.runSpeedMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'equipTimeSeconds',
      name: 'Equip Time',
      icon: 'game-icons--hand-bandage',
      check: (stats) => typeof stats.equipTimeSeconds === 'number',
      value: (stats) => `${parseFloat(stats.equipTimeSeconds.toFixed(2))} s`,
    },
    {
      id: 'reloadTimeSeconds',
      name: 'Reload Time',
      icon: 'game-icons--reload-gun-barrel',
      check: (stats) => typeof stats.reloadTimeSeconds === 'number',
      value: (stats) => `${parseFloat(stats.reloadTimeSeconds.toFixed(2))} s`,
    },
  ];
  const altFireStats = [
    {
      id: 'altFireType',
      name: 'Type',
      icon: 'game-icons--switch-weapon',
      check: (stats) => typeof stats.altFireType === 'string',
      value: (stats) => displayAltFireType[stats.altFireType],
    },
    {
      id: 'adsStats.zoomMultiplier',
      name: 'Zoom Multiplier',
      icon: 'game-icons--reticule',
      check: (stats) => typeof stats.adsStats?.zoomMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.adsStats?.zoomMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'adsStats.burstCount',
      name: 'Burst Count',
      icon: 'game-icons--bullet-impacts',
      check: (stats) => stats.adsStats?.burstCount > 0,
      value: (stats) =>
        `${stats.adsStats?.burstCount} round${stats.adsStats?.burstCount > 1 ? 's' : ''}`,
    },
    {
      id: 'adsStats.fireRate',
      name: 'Fire Rate',
      icon: 'game-icons--silver-bullet',
      check: (stats) => typeof stats.adsStats?.fireRate === 'number',
      value: (stats) =>
        `${parseFloat(stats.adsStats?.fireRate.toFixed(2))} rounds/s`,
    },
    {
      id: 'adsStats.firstBulletAccuracy',
      name: 'First Bullet Miss',
      icon: 'game-icons--targeting',
      check: (stats) => typeof stats.adsStats?.firstBulletAccuracy === 'number',
      value: (stats) =>
        `${stats.adsStats?.firstBulletAccuracy > 0 ? parseFloat((stats.adsStats?.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
    },
    {
      id: 'adsStats.runSpeedMultiplier',
      name: 'Run Speed Multiplier',
      icon: 'game-icons--run',
      check: (stats) => typeof stats.adsStats?.runSpeedMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.adsStats?.runSpeedMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'altShotgunStats.shotgunPelletCount',
      name: 'Pellet Count',
      icon: 'game-icons--heavy-bullets',
      check: (stats) =>
        typeof stats.altShotgunStats?.shotgunPelletCount === 'number',
      value: (stats) =>
        `${stats.altShotgunStats?.shotgunPelletCount} pellet${stats.altShotgunStats?.shotgunPelletCount > 1 ? 's' : ''}`,
    },
    {
      id: 'altShotgunStats.burstRate',
      name: 'Burst Rate',
      icon: 'game-icons--bullets',
      check: (stats) => typeof stats.altShotgunStats?.burstRate === 'number',
      value: (stats) =>
        `${parseFloat(stats.altShotgunStats?.burstRate.toFixed(2))} bursts/s`,
    },
    {
      id: 'airBurstStats.shotgunPelletCount',
      name: 'Pellet Count',
      icon: 'game-icons--shotgun-rounds',
      check: (stats) =>
        typeof stats.airBurstStats?.shotgunPelletCount === 'number',
      value: (stats) =>
        `${stats.airBurstStats?.shotgunPelletCount} pellet${stats.airBurstStats?.shotgunPelletCount > 1 ? 's' : ''}`,
    },
    {
      id: 'airBurstStats.burstDistance',
      name: 'Burst Distance',
      icon: 'game-icons--wide-arrow-dunk',
      check: (stats) => typeof stats.airBurstStats?.burstDistance === 'number',
      value: (stats) =>
        `${parseFloat(stats.airBurstStats?.burstDistance.toFixed(2))} m`,
    },
  ];
  const damageRanges = [
    {
      id: 'headDamage',
      name: 'Head',
      icon: 'game-icons--headshot',
    },
    {
      id: 'bodyDamage',
      name: 'Body',
      icon: 'game-icons--pierced-body',
    },
    {
      id: 'legDamage',
      name: 'Leg',
      icon: 'game-icons--hieroglyph-legs',
    },
  ];
</script>

{#snippet simpleStat(icon, name, value)}
  <li class="flex flex-col gap-2 bg-base-200 p-4 md:bg-base-300">
    <header class="flex items-center gap-1 text-primary">
      <span class="mb-1 iconify {icon}"></span>
      <h3 class="font-bold">{name}</h3>
    </header>
    <span class="text-xl font-semibold">
      {value}
    </span>
  </li>
{/snippet}

<main class="lg:px-12">
  <div
    class="mx-auto flex max-w-7xl flex-col md:gap-4 md:pb-8 lg:flex-row lg:items-start lg:gap-8 lg:py-16"
  >
    <figure class="flex items-center justify-center bg-base-200 p-4 lg:w-4/12">
      <img
        class="aspect-2/1 w-full object-contain object-center"
        src={data.weapon.images.display}
        alt={data.weapon.name}
      />
    </figure>
    <section
      class="flex flex-col gap-8 px-4 py-8 md:mx-4 md:bg-base-200 md:p-8 lg:mx-0 lg:w-8/12"
    >
      <header class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="text-2xl font-extrabold">{data.weapon.name}</h1>
          <div class="badge gap-1 badge-primary">
            <span class="mb-0.5 iconify {categoryIcons[data.weapon.category]}"
            ></span>
            {data.weapon.category}
          </div>
        </div>
        <p
          class="flex items-center gap-2 text-sm text-base-content/60 contrast-more:text-base-content"
        >
          Cost:
          <span class="inline-flex items-center gap-1 font-bold">
            <span class="mb-1 iconify game-icons--two-coins"></span>
            {displayCost}
          </span>
        </p>
      </header>
      {#if data.weapon.name !== 'Melee'}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">General Stats</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each generalStats as stat (stat.id)}
              {#if stat.check(data.weapon.stats)}
                {@render simpleStat(
                  stat.icon,
                  stat.name,
                  stat.value(data.weapon.stats)
                )}
              {/if}
            {/each}
          </ul>
        </section>
      {/if}
      {#if data.weapon.stats.altFireType}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">Alt Fire Stats</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each altFireStats as stat (stat.id)}
              {#if stat.check(data.weapon.stats)}
                {@render simpleStat(
                  stat.icon,
                  stat.name,
                  stat.value(data.weapon.stats)
                )}
              {/if}
            {/each}
          </ul>
        </section>
      {/if}
      {#if data.weapon.stats.damageRanges}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">Damage Ranges</h2>
          <ul
            class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          >
            {#each data.weapon.stats.damageRanges as damageRange (damageRange.rangeStartMeters)}
              <li class="flex flex-col bg-base-200 md:bg-base-300">
                <header
                  class="flex items-center justify-center bg-primary p-1 text-center text-primary-content"
                >
                  <h3 class="font-bold">
                    {damageRange.rangeStartMeters} m&ndash;{damageRange.rangeEndMeters}
                    m
                  </h3>
                </header>
                <ul class="flex flex-col justify-center p-4 text-center">
                  {#each damageRanges as dr (dr.id)}
                    <li
                      class="flex items-center justify-between gap-2 before:order-1 before:mb-2 before:flex-1 before:self-end before:border-b before:border-dashed"
                    >
                      <span class="flex items-center gap-1 font-semibold">
                        <span class="mb-1 iconify {dr.icon}"></span>
                        {dr.name}
                      </span>
                      <span class="order-2">
                        {parseFloat(damageRange[dr.id].toFixed(2))}
                      </span>
                    </li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    </section>
  </div>
</main>
