/* global self */

import fetch from 'isomorphic-fetch'
import oboe from 'oboe'
import processEvents from './process_events'
import Runner from './runner'
import apiEndpoint from '../data/api'
import worlds from './../data/worlds'

var mission = null
var runner = null
var world = null

const limit = 10000
var offset = 0

function eventsUrl (limit, offset) {
  return apiEndpoint + '/missions/' + mission.id + '/events'
}

function loadMission (id) {
  fetch(apiEndpoint + '/missions/' + id)
    .then(req => req.json())
    .then(json => {
      mission = json
      world = worlds[mission.world.toLowerCase()]
      loadEvents()
    })
}

function loadEvents () {
  console.log("START LOADING")
  var start = new Date()
  createRunner([])
  oboe(eventsUrl())
    .node('!.*', (event) => {
      runner.addEvents(processEvents([event], world))
      return oboe.drop
    })
    .done(() => {
      console.log("DONE LOADING IN " + ((new Date().getTime() - start.getTime()) / 1000))
      runner.start()
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
      loadMission(msg.data.id)
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
