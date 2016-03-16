export const markerTypes = [
  "car",
  "helicopter",
  "motorcycle",
  "parachute",
  "plane",
  "ship",
  "soldier",
  "tank",
];

export function normalizeSimulation(simulation) {
  for (var markerType of markerTypes) {
    if (simulation.includes(markerType)) {
      return markerType;
    }
  };

  return simulation;
}
