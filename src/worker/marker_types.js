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
    if (simulation.toLowerCase().includes(markerType)) {
      return markerType;
    }
  };

  return null;
}
