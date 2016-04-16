import fetch from 'isomorphic-fetch';
import { projectileColor } from './colors';
import { unitClassName, vehicleClassName } from './marker_classes';
import { markerSize } from './marker_sizes';
import Runner from './runner';
import apiEndpoint from '../data/api';
import worlds from './../data/worlds';

var runner = null;

function loadMission(id) {
  fetch(apiEndpoint + '/missions/' + id)
    .then(req => req.json())
    .then(json => loadEvents(id, json.world));
}

function loadEvents(id, worldName) {
  fetch(apiEndpoint + '/missions/' + id + '/events')
    .then(req => req.json())
    .then((json) => computeEvents(json, worldName));
}

function computeEvents(events, worldName) {
  const world = worlds[worldName.toLowerCase()];

  if (world) {
    var computedEvents = [];

    events.map(function (event) {
      if (event.projectile) {
        computedEvents.push({
          id: event.projectile.id,
          x: event.projectile.position.x,
          y: (world.size[1] - event.projectile.position.y),
          color: projectileColor(event.projectile.side),
          weight: 1,
          timestamp: new Date(event.timestamp),
          type: 'projectiles',
        });
      }

      if (event.unit) {
        computedEvents.push({
          id: event.unit.id,
          rotation: event.unit.position.dir,
          x: event.unit.position.x,
          y: (world.size[1] - event.unit.position.y),
          className: unitClassName(event.unit),
          markerSize: [16, 16],
          name: event.unit.name,
          timestamp: new Date(event.timestamp),
          type: 'units',
        });
      }

      if (event.vehicle && event.vehicle.name != "Ground" && event.vehicle.simulation != "thingX") {
        computedEvents.push({
          id: event.vehicle.id,
          rotation: event.vehicle.position.dir,
          x: event.vehicle.position.x,
          y: (world.size[1] - event.vehicle.position.y),
          className: vehicleClassName(event.vehicle),
          markerSize: markerSize(event.vehicle.simulation),
          name: event.vehicle.name,
          timestamp: new Date(event.timestamp),
          type: 'vehicles',
        });
      }

      return null;
    });

    runner = new Runner(computedEvents, function (events) {
      self.postMessage({
        type: 'events',
        projectiles: events.projectiles,
        units: events.units,
        vehicles: events.vehicles,
        time: events.time,
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
    case 'seek':
      runner.seek(msg.data.seek);
      break;
    case 'stop':
      runner.stop();
      break;
    default:
      throw 'no action for type';
  }
}
