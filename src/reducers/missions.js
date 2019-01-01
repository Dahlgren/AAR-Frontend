import {
  INVALIDATE_MISSIONS,
  REQUEST_MISSIONS,
  RECEIVE_MISSIONS,
  SET_MISSIONS_FILTER,
  SET_MISSIONS_PAGE
} from '../actions/missions'

import filterMissions from '../utils/filterMissions'

export function missions (state = {
  isFetching: false,
  didInvalidate: false,
  filter: {
    length: 600,
    name: '',
    world: ''
  },
  filteredMissions: [],
  missions: [],
  missionsById: null,
  page: 1
}, action) {
  switch (action.type) {
    case INVALIDATE_MISSIONS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_MISSIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_MISSIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        filteredMissions: filterMissions(action.missions, state.filter),
        missions: action.missions,
        missionsById: action.missionsById,
        page: 1,
        lastUpdated: action.receivedAt
      })
    case SET_MISSIONS_FILTER:
      return Object.assign({}, state, {
        filter: action.filter,
        filteredMissions: filterMissions(state.missions, action.filter),
        page: 1
      })
    case SET_MISSIONS_PAGE:
      return Object.assign({}, state, {
        page: action.page
      })
    default:
      return state
  }
}
