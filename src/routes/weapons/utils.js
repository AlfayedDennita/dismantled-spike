import { m } from '$lib/paraglide/messages.js';

export const categoryIcons = {
  Melee: 'iconify game-icons--butterfly-knife',
  Sidearm: 'iconify game-icons--pistol-gun',
  SMG: 'iconify game-icons--mp5',
  Shotgun: 'iconify game-icons--sawed-off-shotgun',
  Rifle: 'iconify game-icons--ak47',
  Sniper: 'iconify game-icons--reticule',
  Heavy: 'iconify game-icons--minigun',
};

export const displayCategory = {
  Melee: m.weapons_categories_melee(),
  Sidearm: m.weapons_categories_sidearm(),
  SMG: 'SMG',
  Shotgun: 'Shotgun',
  Rifle: 'Rifle',
  Sniper: 'Sniper',
  Heavy: 'Heavy Machine Gun',
};

export const displayWallPenetration = {
  Low: m.weapon_wall_penetrations_low(),
  Medium: m.weapon_wall_penetrations_medium(),
  High: m.weapon_wall_penetrations_high(),
};

export const displayFireMode = {
  SemiAutomatic: m.weapon_fire_mode_semi_automatic(),
};

export const displayFeature = {
  Silenced: m.weapon_features_silenced(),
  DualZoom: m.weapon_features_dual_zoom(),
  ROFIncrease: m.weapon_features_rof_increase(),
};

export const displayAltFireType = {
  ADS: 'ADS',
  AirBurst: 'Air Burst',
  Shotgun: 'Shotgun',
};

export function displayCost(cost) {
  if (cost === 1) {
    return `${cost} ${m.weapon_cost_credit()}`;
  } else if (cost > 1) {
    return `${cost} ${m.weapon_cost_credits()}`;
  } else {
    return m.weapon_cost_free();
  }
}

export const generalStats = {
  fireMode: {
    name: m.weapon_stats_fire_mode(),
    icon: 'iconify game-icons--duel',
    check: (stats) => typeof stats.fireMode === 'string',
    value: (stats) => displayFireMode[stats.fireMode],
  },
  feature: {
    name: m.weapon_stats_feature(),
    icon: 'iconify famicons--sparkles-sharp',
    check: (stats) => typeof stats.feature === 'string',
    value: (stats) => displayFeature[stats.feature],
  },
  wallPenetration: {
    name: m.weapon_stats_wall_penetration(),
    icon: 'iconify game-icons--supersonic-bullet',
    check: (stats) => typeof stats.wallPenetration === 'string',
    value: (stats) => displayWallPenetration[stats.wallPenetration],
  },
  magazineSize: {
    name: m.weapon_stats_magazine_size(),
    icon: 'iconify game-icons--machine-gun-magazine',
    check: (stats) => typeof stats.magazineSize === 'number',
    value: (stats) => m.weapon_units_round({ value: stats.magazineSize }),
  },
  shotgunPelletCount: {
    name: m.weapon_stats_pellet_count(),
    icon: 'iconify game-icons--shotgun-rounds',
    check: (stats) => stats.shotgunPelletCount > 1,
    value: (stats) =>
      m.weapon_units_pellet({ value: stats.shotgunPelletCount }),
  },
  fireRate: {
    name: m.weapon_stats_fire_rate(),
    icon: 'iconify game-icons--silver-bullet',
    check: (stats) => typeof stats.fireRate === 'number',
    value: (stats) =>
      `${parseFloat(stats.fireRate.toFixed(2))} ${m.weapon_units_rounds_per_sec()}`,
  },
  firstBulletAccuracy: {
    name: m.weapon_stats_first_bullet_miss(),
    icon: 'iconify game-icons--targeting',
    check: (stats) => typeof stats.firstBulletAccuracy === 'number',
    value: (stats) =>
      `${stats.firstBulletAccuracy > 0 ? parseFloat((stats.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
  },
  runSpeedMultiplier: {
    name: m.weapon_stats_run_speed_multiplier(),
    icon: 'iconify game-icons--run',
    check: (stats) => typeof stats.runSpeedMultiplier === 'number',
    value: (stats) =>
      `${parseFloat((stats.runSpeedMultiplier * 100).toFixed(2))}%`,
  },
  equipTimeSeconds: {
    name: m.weapon_stats_equip_time(),
    icon: 'iconify game-icons--hand-bandage',
    check: (stats) => typeof stats.equipTimeSeconds === 'number',
    value: (stats) =>
      `${parseFloat(stats.equipTimeSeconds.toFixed(2))} ${m.weapon_units_sec()}`,
  },
  reloadTimeSeconds: {
    name: m.weapon_stats_reload_time(),
    icon: 'iconify game-icons--reload-gun-barrel',
    check: (stats) => typeof stats.reloadTimeSeconds === 'number',
    value: (stats) =>
      `${parseFloat(stats.reloadTimeSeconds.toFixed(2))} ${m.weapon_units_sec()}`,
  },
};

export const altFireStats = {
  altFireType: {
    name: m.weapon_stats_alt_fire_type(),
    icon: 'iconify game-icons--switch-weapon',
    check: (stats) => typeof stats.altFireType === 'string',
    value: (stats) => displayAltFireType[stats.altFireType],
  },
  adsZoomMultiplier: {
    name: m.weapon_stats_zoom_multiplier(),
    icon: 'iconify game-icons--reticule',
    check: (stats) => typeof stats.adsStats?.zoomMultiplier === 'number',
    value: (stats) =>
      `${parseFloat((stats.adsStats?.zoomMultiplier * 100).toFixed(2))}%`,
  },
  adsBurstCount: {
    name: m.weapon_stats_burst_count(),
    icon: 'iconify game-icons--bullet-impacts',
    check: (stats) => stats.adsStats?.burstCount > 0,
    value: (stats) =>
      m.weapon_units_round({ value: stats.adsStats?.burstCount }),
  },
  adsFireRate: {
    name: m.weapon_stats_fire_rate(),
    icon: 'iconify game-icons--silver-bullet',
    check: (stats) => typeof stats.adsStats?.fireRate === 'number',
    value: (stats) =>
      `${parseFloat(stats.adsStats?.fireRate.toFixed(2))} ${m.weapon_units_rounds_per_sec()}`,
  },
  adsFirstBulletAccuracy: {
    name: m.weapon_stats_first_bullet_miss(),
    icon: 'iconify game-icons--targeting',
    check: (stats) => typeof stats.adsStats?.firstBulletAccuracy === 'number',
    value: (stats) =>
      `${stats.adsStats?.firstBulletAccuracy > 0 ? parseFloat((stats.adsStats?.firstBulletAccuracy * 100).toFixed(2)) : 0}%`,
  },
  adsRunSpeedMultiplier: {
    name: m.weapon_stats_run_speed_multiplier(),
    icon: 'iconify game-icons--run',
    check: (stats) => typeof stats.adsStats?.runSpeedMultiplier === 'number',
    value: (stats) =>
      `${parseFloat((stats.adsStats?.runSpeedMultiplier * 100).toFixed(2))}%`,
  },
  altShotgunShotgunPelletCount: {
    name: m.weapon_stats_pellet_count(),
    icon: 'iconify game-icons--heavy-bullets',
    check: (stats) =>
      typeof stats.altShotgunStats?.shotgunPelletCount === 'number',
    value: (stats) =>
      m.weapon_units_pellet({
        value: stats.altShotgunStats?.shotgunPelletCount,
      }),
  },
  altShotgunBurstRate: {
    name: m.weapon_stats_burst_rate(),
    icon: 'iconify game-icons--bullets',
    check: (stats) => typeof stats.altShotgunStats?.burstRate === 'number',
    value: (stats) =>
      `${parseFloat(stats.altShotgunStats?.burstRate.toFixed(2))} ${m.weapon_units_bursts_per_sec()}`,
  },
  airBurstShotgunPelletCount: {
    name: m.weapon_stats_pellet_count(),
    icon: 'iconify game-icons--shotgun-rounds',
    check: (stats) =>
      typeof stats.airBurstStats?.shotgunPelletCount === 'number',
    value: (stats) =>
      m.weapon_units_pellet({
        value: stats.airBurstStats?.shotgunPelletCount,
      }),
  },
  airBurstBurstDistance: {
    name: m.weapon_stats_burst_distance(),
    icon: 'iconify game-icons--wide-arrow-dunk',
    check: (stats) => typeof stats.airBurstStats?.burstDistance === 'number',
    value: (stats) =>
      `${parseFloat(stats.airBurstStats?.burstDistance.toFixed(2))} m`,
  },
};

export const damageRanges = {
  headDamage: {
    name: m.weapon_damages_head(),
    icon: 'iconify game-icons--headshot',
  },
  bodyDamage: {
    name: m.weapon_damages_body(),
    icon: 'iconify game-icons--pierced-body',
  },
  legDamage: {
    name: m.weapon_damages_leg(),
    icon: 'iconify game-icons--hieroglyph-legs',
  },
};
