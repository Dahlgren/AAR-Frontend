import fetch from 'isomorphic-fetch'
import apiEndpoint from '../data/worlds'

export const INVALIDATE_WORLDS = 'INVALIDATE_WORLDS'
export const REQUEST_WORLDS = 'REQUEST_WORLDS'
export const RECEIVE_WORLDS = 'RECEIVE_WORLDS'

export function invalidateWorlds () {
  return {
    type: INVALIDATE_WORLDS
  }
}

function requestWorlds () {
  return {
    type: REQUEST_WORLDS
  }
}

function receiveWorlds (worlds) {
  const worldsByName = {}
  worlds.forEach(function (world) {
    worldsByName[world.name] = world
  })

  return {
    type: RECEIVE_WORLDS,
    worlds: worlds,
    worldsByName: worldsByName,
    receivedAt: Date.now()
  }
}

function fetchWorlds () {
  return dispatch => {
    dispatch(requestWorlds())
    return fetch(apiEndpoint + '/worlds')
      .then(req => req.json())
      .then(json => dispatch(receiveWorlds(json)))
  }
}

function shouldFetchWorlds (state) {
  const { worlds } = state
  if (!worlds || !worlds.worldsByName) {
    return true
  } else if (worlds.isFetching) {
    return false
  } else {
    return worlds.didInvalidate
  }
}

export function fetchWorldsIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchWorlds(getState())) {
      return dispatch(fetchWorlds())
    }
  }
}
