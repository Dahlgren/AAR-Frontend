export function projectileWeight(projectile) {
  switch (projectile.simulation) {
    case 'shotMissile':
      return 3;
    case 'shotRocket':
      return 3;
    case 'shotShell':
      return 3;
    default:
      return 1;
  }
}
