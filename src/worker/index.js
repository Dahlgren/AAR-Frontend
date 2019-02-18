/* global self */

import fetch from 'isomorphic-fetch'
import processEvents from './process_events'
import Runner from './runner'
import worlds from './../data/worlds'

const LOAD_MORE_EVENTS_TIMEOUT = 1000
const LOAD_MORE_EVENTS_EMPTY_RESULT_TIMEOUT = 10000

var baseUrl
var mission = null
var runner = null
var world = null

const limit = 10000
var offset = 0

function eventsUrl (limit, offset) {
  return baseUrl + '/missions/' + mission.id + '/events?limit=' + limit + '&offset=' + offset
}

function loadMission (options) {
  baseUrl = options.baseUrl
  fetch(baseUrl + '/missions/' + options.id)
    .then(req => req.json())
    .then(json => {
      mission = json
      world = worlds[mission.world.toLowerCase()]
      loadEvents()
    })
}

function loadEvents () {
  fetch(eventsUrl(limit, offset))
    .then(req => req.json())
    .then((json) => {
      offset = json.length

      if (world) {
        const events = processEvents(json, world)
        createRunner(events)
        loadMoreEvents()
      } else {
        console.log('World "' + mission.world + '" not found, cannot compute correct positions')
      }
    })
}

function loadMoreEvents () {
  fetch(eventsUrl(limit, offset))
    .then(req => req.json())
    .then((json) => {
      if (runner) {
        if (json.length > 0) {
          offset = offset + json.length
          runner.addEvents(processEvents(json, world))
          setTimeout(loadMoreEvents, LOAD_MORE_EVENTS_TIMEOUT)
        } else {
          setTimeout(loadMoreEvents, LOAD_MORE_EVENTS_EMPTY_RESULT_TIMEOUT)
        }
      }
    })
}

function createRunner (events) {
  runner = new Runner(events, function (events) {
    self.postMessage({
      type: 'events',
      projectiles: events.projectiles,
      units: events.units,
      vehicles: events.vehicles,
      time: events.time
    })
  })
}

self.onmessage = function (msg) {
  switch (msg.data.type) {
    case 'load':
      loadMission(msg.data)
      break
    case 'seek':
      runner.seek(msg.data.seek)
      break
    case 'tick':
      runner.tick(msg.data.amount)
      break
    case 'stop':
      runner.stop()
      runner = null
      break
    default:
      throw new Error('no action for type')
  }
}
