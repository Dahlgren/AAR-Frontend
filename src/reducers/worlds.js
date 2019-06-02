import {
  INVALIDATE_WORLDS,
  REQUEST_WORLDS,
  RECEIVE_WORLDS
} from '../actions/worlds'

export function worlds (state = {
  isFetching: false,
  didInvalidate: false,
  worlds: [],
  worldsByName: null
}, action) {
  switch (action.type) {
    case INVALIDATE_WORLDS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_WORLDS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_WORLDS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        worlds: action.worlds,
        worldsByName: action.worldsByName,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
