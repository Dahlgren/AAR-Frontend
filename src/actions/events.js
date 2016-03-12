var Worker = require("worker!../worker");
var worker;

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const STOP_EVENTS = 'STOP_EVENTS';

function requestEvents() {
  return {
    type: REQUEST_EVENTS,
  };
}

function receiveEvents(markers) {
  return {
    type: RECEIVE_EVENTS,
    markers: markers,
  };
}

export function stopEvents() {
  if (worker) {
    worker.terminate();
    worker = null;
  }

  return {
    type: STOP_EVENTS,
  };
}

export function loadEvents(id) {
  return (dispatch, getState) => {
    if (worker) {
      worker.terminate();
    }

    worker = new Worker();
    worker.postMessage({
      type: 'load',
      id: id,
    });
    worker.onmessage = function (msg) {
      switch (msg.data.type) {
        case 'events':
          dispatch(receiveEvents(msg.data.events));
          break;
      }
    };
    return dispatch(requestEvents());
  };
}
