import { projectileColor } from './colors'
import { unitClassName, vehicleClassName } from './marker_classes'
import { markerSize } from './marker_sizes'
import { normalizeSimulation } from './marker_types'
import { projectileWeight } from './projectile_weight'

module.exports = function (events, world) {
  var processedEvents = []

  events.forEach(function (event) {
    if (event.projectile) {
      processedEvents.push({
        id: event.projectile.id,
        x: event.projectile.position.x,
        y: (world.size[1] - event.projectile.position.y),
        color: projectileColor(event.projectile.side),
        weight: projectileWeight(event.projectile),
        timestamp: new Date(event.timestamp),
        type: 'projectiles'
      })
    }

    if (event.unit) {
      processedEvents.push({
        id: event.unit.id,
        rotation: event.unit.position.dir,
        x: event.unit.position.x,
        y: (world.size[1] - event.unit.position.y),
        className: unitClassName(event.unit),
        markerSize: [16, 16],
        name: event.unit.name,
        timestamp: new Date(event.timestamp),
        type: 'units'
      })
    }

    if (event.vehicle && normalizeSimulation(event.vehicle.simulation)) {
      processedEvents.push({
        id: event.vehicle.id,
        rotation: event.vehicle.position.dir,
        x: event.vehicle.position.x,
        y: (world.size[1] - event.vehicle.position.y),
        className: vehicleClassName(event.vehicle),
        markerSize: markerSize(event.vehicle.simulation),
        name: event.vehicle.name,
        timestamp: new Date(event.timestamp),
        type: 'vehicles'
      })
    }
  })

  return processedEvents
}
