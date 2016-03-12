import fetch from 'isomorphic-fetch';
import Runner from './runner';
import worlds from './../data/worlds';

function loadMission(id) {
  fetch('/api/missions/' + id)
    .then(req => req.json())
    .then(json => loadEvents(id, json.world));
}

function loadEvents(id, worldName) {
  fetch('/api/missions/' + id + '/events')
    .then(req => req.json())
    .then(json => computeEvents(json, worldName));
}

function computeEvents(events, worldName) {
  const world = worlds[worldName.toLowerCase()];

  if (world) {
    events = events.filter(event => event.data.unit && event.data.unit.position)
    events = events.map(function (event) {
      return {
        id: event.data.unit.id,
        x: event.data.unit.position.x,
        y: (world.size[1] - event.data.unit.position.y),
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
  } else {
    console.log('World "' + worldName + '" not found, cannot compute correct positions');
  }
}

self.onmessage = function(msg) {
  switch (msg.data.type) {
    case 'load':
      loadMission(msg.data.id);
      break;
    default:
      throw 'no action for type';
  }
}
