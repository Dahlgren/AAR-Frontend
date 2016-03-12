import fetch from 'isomorphic-fetch';
import Runner from './runner';

function loadEvents(id) {
  fetch('/api/missions/' + id + '/events')
    .then(req => req.json())
    .then(json => computeEvents(json));
}

function computeEvents(events) {
  events = events.filter(event => event.data.unit && event.data.unit.position)
  events = events.map(function (event) {
    return {
      id: event.data.unit.id,
      x: event.data.unit.position.x,
      y: (32769 - event.data.unit.position.y),
      name: event.data.unit.name,
      timestamp: new Date(event.timestamp),
    };
  });

  events.sort(function (e1, e2) {
    return e1.timestamp- e2.timestamp;
  })

  new Runner(events, function (events) {
    self.postMessage({
      type: 'events',
      events: events,
    })
  });
}

self.onmessage = function(msg) {
  switch (msg.data.type) {
    case 'load':
      loadEvents(msg.data.id);
      break;
    default:
      throw 'no action for type';
  }
}
