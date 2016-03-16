import { markerTypes, normalizeSimulation } from './marker_types';

export function unitClassName(unit) {
  const simulation = "marker-simulation-soldier";

  let side = "marker-side-civ";
  if (unit.side) {
    side = "marker-side-" + unit.side.toLowerCase();
  }

  let state = "marker-state-healthy";
  if (unit.life_state) {
    state = "marker-state-" + unit.life_state.toLowerCase();
  }

  if (unit.vehicle_id) {
    state = "marker-hidden";
  }

  return simulation + " " + side + " " + state;
}

export function vehicleClassName(vehicle) {
  const simulation = "marker-simulation-" + normalizeSimulation(vehicle.simulation.toLowerCase());
  const side = "marker-side-" + vehicle.side.toLowerCase();
  return simulation + " " + side;
}
