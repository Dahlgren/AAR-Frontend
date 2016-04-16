const applyChange  = require('deep-diff').applyChange;

import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS_DIFF,
  SEEK_EVENTS,
  STOP_EVENTS,
} from '../actions/events';

export function events(state = {
  isFetching: false,
  didInvalidate: false,
  projectiles: {},
  units: {},
  vehicles: {},
  time: null,
}, action) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case SEEK_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        projectiles: action.projectiles,
        units: action.units,
        vehicles: action.vehicles,
      });
    case RECEIVE_EVENTS_DIFF:
      const projectiles = JSON.parse(JSON.stringify(state.projectiles));
      action.projectiles.forEach(function (change) {
        applyChange(projectiles, true, change);
      });

      const units = JSON.parse(JSON.stringify(state.units));
      action.units.forEach(function (change) {
        applyChange(units, true, change);
      });

      const vehicles = JSON.parse(JSON.stringify(state.vehicles));
      action.vehicles.forEach(function (change) {
        applyChange(vehicles, true, change);
      });

      return Object.assign({}, state, {
        isFetching: false,
        projectiles: projectiles,
        units: units,
        vehicles: vehicles,
        time: action.time,
      });
    case STOP_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        projectiles: action.projectiles,
        units: action.units,
        vehicles: action.vehicles,
        time: action.time,
      });
    default:
      return state;
  }
}
