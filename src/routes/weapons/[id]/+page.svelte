<script>
  import { m } from '$lib/paraglide/messages.js';

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

  const displayCategory = {
    Melee: m.weapons_categories_melee(),
    Sidearm: m.weapons_categories_sidearm(),
    SMG: 'SMG',
    Shotgun: 'Shotgun',
    Rifle: 'Rifle',
    Sniper: 'Sniper',
    Heavy: 'Heavy Machine Gun',
  };
  const displayCost = $derived.by(() => {
    if (data.weapon.cost === 1) {
      return `${data.weapon.cost} ${m.weapon_cost_credit()}`;
    } else if (data.weapon.cost > 1) {
      return `${data.weapon.cost} ${m.weapon_cost_credits()}`;
    } else {
      return m.weapon_cost_free();
    }
  });
  const displayWallPenetration = {
    Low: m.weapon_wall_penetrations_low(),
    Medium: m.weapon_wall_penetrations_medium(),
    High: m.weapon_wall_penetrations_high(),
  };
  const displayFireMode = {
    SemiAutomatic: m.weapon_fire_mode_semi_automatic(),
  };
  const displayFeature = {
    Silenced: m.weapon_features_silenced(),
    DualZoom: m.weapon_features_dual_zoom(),
    ROFIncrease: m.weapon_features_rof_increase(),
  };
  const displayAltFireType = {
    ADS: 'ADS',
    AirBurst: 'Air Burst',
    Shotgun: 'Shotgun',
  };

  const generalStats = [
    {
      id: 'fireMode',
      name: m.weapon_stats_fire_mode(),
      icon: 'game-icons--duel',
      check: (stats) => typeof stats.fireMode === 'string',
      value: (stats) => displayFireMode[stats.fireMode],
    },
    {
      id: 'feature',
      name: m.weapon_stats_feature(),
      icon: 'famicons--sparkles-sharp',
      check: (stats) => typeof stats.feature === 'string',
      value: (stats) => displayFeature[stats.feature],
    },
    {
      id: 'wallPenetration',
      name: m.weapon_stats_wall_penetration(),
      icon: 'game-icons--supersonic-bullet',
      check: (stats) => typeof stats.wallPenetration === 'string',
      value: (stats) => displayWallPenetration[stats.wallPenetration],
    },
    {
      id: 'magazineSize',
      name: m.weapon_stats_magazine_size(),
      icon: 'game-icons--machine-gun-magazine',
      check: (stats) => typeof stats.magazineSize === 'number',
      value: (stats) => m.weapon_units_round({ value: stats.magazineSize }),
    },
    {
      id: 'shotgunPelletCount',
      name: m.weapon_stats_pellet_count(),
      icon: 'game-icons--shotgun-rounds',
      check: (stats) => stats.shotgunPelletCount > 1,
      value: (stats) =>
        m.weapon_units_pellet({ value: stats.shotgunPelletCount }),
    },
    {
      id: 'fireRate',
      name: m.weapon_stats_fire_rate(),
      icon: 'game-icons--silver-bullet',
      check: (stats) => typeof stats.fireRate === 'number',
      value: (stats) =>
        `${parseFloat(stats.fireRate.toFixed(2))} ${m.weapon_units_rounds_per_sec()}`,
    },
    {
      id: 'firstBulletAccuracy',
      name: m.weapon_stats_first_bullet_miss(),
      icon: 'game-icons--targeting',
      check: (stats) => typeof stats.firstBulletAccuracy === 'number',
      value: (stats) =>
        `${stats.firstBulletAccuracy > 0 ? parseFloat((stats.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
    },
    {
      id: 'runSpeedMultiplier',
      name: m.weapon_stats_run_speed_multiplier(),
      icon: 'game-icons--run',
      check: (stats) => typeof stats.runSpeedMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.runSpeedMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'equipTimeSeconds',
      name: m.weapon_stats_equip_time(),
      icon: 'game-icons--hand-bandage',
      check: (stats) => typeof stats.equipTimeSeconds === 'number',
      value: (stats) =>
        `${parseFloat(stats.equipTimeSeconds.toFixed(2))} ${m.weapon_units_sec()}`,
    },
    {
      id: 'reloadTimeSeconds',
      name: m.weapon_stats_reload_time(),
      icon: 'game-icons--reload-gun-barrel',
      check: (stats) => typeof stats.reloadTimeSeconds === 'number',
      value: (stats) =>
        `${parseFloat(stats.reloadTimeSeconds.toFixed(2))} ${m.weapon_units_sec()}`,
    },
  ];
  const altFireStats = [
    {
      id: 'altFireType',
      name: m.weapon_stats_alt_fire_type(),
      icon: 'game-icons--switch-weapon',
      check: (stats) => typeof stats.altFireType === 'string',
      value: (stats) => displayAltFireType[stats.altFireType],
    },
    {
      id: 'adsStats.zoomMultiplier',
      name: m.weapon_stats_zoom_multiplier(),
      icon: 'game-icons--reticule',
      check: (stats) => typeof stats.adsStats?.zoomMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.adsStats?.zoomMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'adsStats.burstCount',
      name: m.weapon_stats_burst_count(),
      icon: 'game-icons--bullet-impacts',
      check: (stats) => stats.adsStats?.burstCount > 0,
      value: (stats) =>
        m.weapon_units_round({ value: stats.adsStats?.burstCount }),
    },
    {
      id: 'adsStats.fireRate',
      name: m.weapon_stats_fire_rate(),
      icon: 'game-icons--silver-bullet',
      check: (stats) => typeof stats.adsStats?.fireRate === 'number',
      value: (stats) =>
        `${parseFloat(stats.adsStats?.fireRate.toFixed(2))} ${m.weapon_units_rounds_per_sec()}`,
    },
    {
      id: 'adsStats.firstBulletAccuracy',
      name: m.weapon_stats_first_bullet_miss(),
      icon: 'game-icons--targeting',
      check: (stats) => typeof stats.adsStats?.firstBulletAccuracy === 'number',
      value: (stats) =>
        `${stats.adsStats?.firstBulletAccuracy > 0 ? parseFloat((stats.adsStats?.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
    },
    {
      id: 'adsStats.runSpeedMultiplier',
      name: m.weapon_stats_run_speed_multiplier(),
      icon: 'game-icons--run',
      check: (stats) => typeof stats.adsStats?.runSpeedMultiplier === 'number',
      value: (stats) =>
        `${parseFloat((stats.adsStats?.runSpeedMultiplier * 100).toFixed(2))}%`,
    },
    {
      id: 'altShotgunStats.shotgunPelletCount',
      name: m.weapon_stats_pellet_count(),
      icon: 'game-icons--heavy-bullets',
      check: (stats) =>
        typeof stats.altShotgunStats?.shotgunPelletCount === 'number',
      value: (stats) =>
        m.weapon_units_pellet({
          value: stats.altShotgunStats?.shotgunPelletCount,
        }),
    },
    {
      id: 'altShotgunStats.burstRate',
      name: m.weapon_stats_burst_rate(),
      icon: 'game-icons--bullets',
      check: (stats) => typeof stats.altShotgunStats?.burstRate === 'number',
      value: (stats) =>
        `${parseFloat(stats.altShotgunStats?.burstRate.toFixed(2))} ${m.weapon_units_bursts_per_sec()}`,
    },
    {
      id: 'airBurstStats.shotgunPelletCount',
      name: m.weapon_stats_pellet_count(),
      icon: 'game-icons--shotgun-rounds',
      check: (stats) =>
        typeof stats.airBurstStats?.shotgunPelletCount === 'number',
      value: (stats) =>
        m.weapon_units_pellet({
          value: stats.airBurstStats?.shotgunPelletCount,
        }),
    },
    {
      id: 'airBurstStats.burstDistance',
      name: m.weapon_stats_burst_distance(),
      icon: 'game-icons--wide-arrow-dunk',
      check: (stats) => typeof stats.airBurstStats?.burstDistance === 'number',
      value: (stats) =>
        `${parseFloat(stats.airBurstStats?.burstDistance.toFixed(2))} m`,
    },
  ];
  const damageRanges = [
    {
      id: 'headDamage',
      name: m.weapon_damages_head(),
      icon: 'game-icons--headshot',
    },
    {
      id: 'bodyDamage',
      name: m.weapon_damages_body(),
      icon: 'game-icons--pierced-body',
    },
    {
      id: 'legDamage',
      name: m.weapon_damages_leg(),
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
            {displayCategory[data.weapon.category]}
          </div>
        </div>
        <p
          class="flex items-center gap-2 text-sm text-base-content/60 contrast-more:text-base-content"
        >
          {m.weapon_cost_title()}:
          <span class="inline-flex items-center gap-1 font-bold">
            <span class="mb-1 iconify game-icons--two-coins"></span>
            {displayCost}
          </span>
        </p>
      </header>
      {#if data.weapon.name !== 'Melee'}
        <section class="flex flex-col gap-2">
          <h2 class="font-bold uppercase">{m.weapon_stats_title_general()}</h2>
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
          <h2 class="font-bold uppercase">{m.weapon_stats_title_alt_fire()}</h2>
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
          <h2 class="font-bold uppercase">{m.weapon_damages_title()}</h2>
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
