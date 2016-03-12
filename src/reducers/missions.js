import {
  INVALIDATE_MISSIONS,
  REQUEST_MISSIONS,
  RECEIVE_MISSIONS
} from '../actions/missions';

export function missions(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_MISSIONS:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_MISSIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_MISSIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.missions,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}
