/* eslint import/no-webpack-loader-syntax: off */
import Worker from 'worker!../worker'
let worker

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const STOP_EVENTS = 'STOP_EVENTS'

function requestEvents (request) {
  return {
    type: REQUEST_EVENTS,
    request: request
  }
}

function receiveEvents (data) {
  return {
    type: RECEIVE_EVENTS,
    projectiles: data.projectiles,
    units: data.units,
    vehicles: data.vehicles,
    time: data.time,
    request: data.request
  }
}

export function seekEvents (seek) {
  worker.postMessage({
    type: 'seek',
    seek: seek,
    request: seek
  })

  return requestEvents(seek)
}

export function tickEvents (amount, request) {
  worker.postMessage({
    type: 'tick',
    amount: amount,
    request: request
  })

  return requestEvents(request)
}

export function stopEvents () {
  if (worker) {
    worker.postMessage({
      type: 'stop'
    })
    worker.terminate()
    worker = null
  }

  return {
    type: STOP_EVENTS,
    projectiles: [],
    units: [],
    vehicles: [],
    time: null
  }
}

export function loadEvents (id) {
  return (dispatch, getState) => {
    if (worker) {
      worker.terminate()
    }

    worker = new Worker()
    worker.postMessage({
      type: 'load',
      id: id
    })
    worker.onmessage = function (msg) {
      switch (msg.data.type) {
        case 'events':
          dispatch(receiveEvents(msg.data))
          break
      }
    }
    return dispatch(requestEvents(0))
  }
}
