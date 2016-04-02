import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  SEEK_EVENTS,
  STOP_EVENTS,
} from '../actions/events';

export function events(state = {
  isFetching: false,
  didInvalidate: false,
  markers: [],
  time: null,
}, action) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        markers: action.markers,
        time: action.time,
      });
    case STOP_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
