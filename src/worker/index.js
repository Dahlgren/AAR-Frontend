import fetch from 'isomorphic-fetch';
import processEvents from './process_events';
import Runner from './runner';
import apiEndpoint from '../data/api';
import worlds from './../data/worlds';

var runner = null;

function loadMission(id) {
  fetch(apiEndpoint + '/missions/' + id)
    .then(req => req.json())
    .then(mission => loadEvents(mission));
}

function loadEvents(mission) {
  fetch(apiEndpoint + '/missions/' + mission.id + '/events')
    .then(req => req.json())
    .then((json) => {
      const world = worlds[mission.world.toLowerCase()];

      if (world) {
        const events = processEvents(json, world);
        createRunner(events);
      } else {
        console.log('World "' + mission.world + '" not found, cannot compute correct positions');
      }
    });
}

function createRunner(events) {
  runner = new Runner(events, function (events) {
    self.postMessage({
      type: 'events',
      projectiles: events.projectiles,
      units: events.units,
      vehicles: events.vehicles,
      time: events.time,
    })
  });
}

self.onmessage = function(msg) {
  switch (msg.data.type) {
    case 'load':
      loadMission(msg.data.id);
      break;
    case 'seek':
      runner.seek(msg.data.seek);
      break;
    case 'tick':
      runner.tick(msg.data.amount);
      break;
    case 'stop':
      runner.stop();
      break;
    default:
      throw 'no action for type';
  }
}
