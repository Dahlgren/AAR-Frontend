import fetch from 'isomorphic-fetch';

export const INVALIDATE_MISSIONS = 'INVALIDATE_MISSIONS';
export const REQUEST_MISSIONS = 'REQUEST_MISSIONS';
export const RECEIVE_MISSIONS = 'RECEIVE_MISSIONS';

export function invalidateMissions() {
  return {
    type: INVALIDATE_MISSIONS,
  };
}

function requestMissions() {
  return {
    type: REQUEST_MISSIONS,
  };
}

function receiveMissions(missions) {
  let missionsById = {}
  missions.forEach(function (mission) {
    missionsById[mission.id] = mission
  });

  return {
    type: RECEIVE_MISSIONS,
    missions: missions,
    missionsById: missionsById,
    receivedAt: Date.now(),
  };
}

function fetchMissions() {
  return dispatch => {
    dispatch(requestMissions());
    return fetch('/api/missions')
      .then(req => req.json())
      .then(json => dispatch(receiveMissions(json)));
  };
}

function shouldFetchMissions(state) {
  const missions = state.missions;
  if (!missions || !missions.missionsById) {
    return true;
  } else if (missions.isFetching) {
    return false;
  } else {
    return missions.didInvalidate;
  }
}

export function fetchMissionsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchMissions(getState())) {
      return dispatch(fetchMissions());
    }
  };
}
