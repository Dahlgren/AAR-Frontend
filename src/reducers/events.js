import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  STOP_EVENTS
} from '../actions/events'

export function events (state = {
  isFetching: false,
  didInvalidate: false,
  projectiles: [],
  units: [],
  vehicles: [],
  time: null,
  request: 0
}, action) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
        request: action.request
      })
    case RECEIVE_EVENTS:
      if (state.request !== action.request) {
        return state
      }

      return Object.assign({}, state, {
        isFetching: false,
        projectiles: action.projectiles,
        units: action.units,
        vehicles: action.vehicles,
        time: action.time,
        request: action.request
      })
    case STOP_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        projectiles: action.projectiles,
        units: action.units,
        vehicles: action.vehicles,
        time: action.time
      })
    default:
      return state
  }
}
