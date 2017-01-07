import {
  INVALIDATE_MISSIONS,
  REQUEST_MISSIONS,
  RECEIVE_MISSIONS,
  SET_MISSIONS_PAGE,
} from '../actions/missions';

export function missions(state = {
  isFetching: false,
  didInvalidate: false,
  missions: [],
  missionsById: null,
  page: 1,
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
        missions: action.missions,
        missionsById: action.missionsById,
        page: 1,
        lastUpdated: action.receivedAt,
      });
    case SET_MISSIONS_PAGE:
      return Object.assign({}, state, {
        page: action.page,
      });
    default:
      return state;
  }
}
