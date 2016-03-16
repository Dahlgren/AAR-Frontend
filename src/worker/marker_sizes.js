import { normalizeSimulation } from './marker_types';

const sizes = {
  car: [24, 24],
  helicopter: [32, 32],
  plane: [32, 32],
  ship: [24, 24],
  tank: [32, 32],
}

export function markerSize(simulation) {
  const normalizedSimulation = normalizeSimulation(simulation);

  if (sizes[normalizedSimulation]) {
    return sizes[normalizedSimulation];
  }

  return [16, 16];
}
