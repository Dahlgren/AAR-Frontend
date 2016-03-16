import fetch from 'isomorphic-fetch';
import { unitClassName, vehicleClassName } from './marker_classes';
import { markerSize } from './marker_sizes';
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
    events = events.map(function (event) {
      if (event.data.unit) {
        return {
          id: event.data.unit.id,
          rotation: event.data.unit.position.dir,
          x: event.data.unit.position.x,
          y: (world.size[1] - event.data.unit.position.y),
          className: unitClassName(event.data.unit),
          markerSize: [16, 16],
          name: event.data.unit.name,
          timestamp: new Date(event.timestamp),
        };
      }

      if (event.data.vehicle) {
        return {
          id: event.data.vehicle.id,
          rotation: event.data.vehicle.position.dir,
          x: event.data.vehicle.position.x,
          y: (world.size[1] - event.data.vehicle.position.y),
          className: vehicleClassName(event.data.vehicle),
          markerSize: markerSize(event.data.vehicle.simulation),
          name: event.data.vehicle.name,
          timestamp: new Date(event.timestamp),
        };
      }

      return null;
    });
    events = events.filter(function (event) {
      return event != null;
    });

    events.sort(function (e1, e2) {
      return e1.timestamp - e2.timestamp;
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
