import fetch from 'isomorphic-fetch';
import { unitClassName, vehicleClassName } from './marker_classes';
import { markerSize } from './marker_sizes';
import Runner from './runner';
import worlds from './../data/worlds';

const EVENTS_PER_PAGE = 100;
const loadedEvents = [];

function loadMission(id) {
  fetch('/api/missions/' + id)
    .then(req => req.json())
    .then(json => loadEvents(id, json.world, EVENTS_PER_PAGE, 0));
}

function loadEvents(id, worldName, limit, offset) {
  fetch('/api/missions/' + id + '/events?limit=' + limit + '&offset=' + offset)
    .then(req => req.json())
    .then(function (json) {
      if (json.length == 0) {
        computeEvents(loadedEvents, worldName)
      } else {
        loadedEvents.push(...json);
        loadEvents(id, worldName, limit, offset + json.length);
      }
    });
}

function computeEvents(events, worldName) {
  const world = worlds[worldName.toLowerCase()];

  if (world) {
    events = events.map(function (event) {
      if (event.unit) {
        return {
          id: event.unit.id,
          rotation: event.unit.position.dir,
          x: event.unit.position.x,
          y: (world.size[1] - event.unit.position.y),
          className: unitClassName(event.unit),
          markerSize: [16, 16],
          name: event.unit.name,
          timestamp: new Date(event.timestamp),
        };
      }

      if (event.vehicle) {
        return {
          id: event.vehicle.id,
          rotation: event.vehicle.position.dir,
          x: event.vehicle.position.x,
          y: (world.size[1] - event.vehicle.position.y),
          className: vehicleClassName(event.vehicle),
          markerSize: markerSize(event.vehicle.simulation),
          name: event.vehicle.name,
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
