import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Map, LayersControl, LayerGroup, TileLayer } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import MiniMap from 'leaflet-minimap'
import { ArmaMarkers } from './ArmaMarkers'
import { ArmaProjectiles } from './ArmaProjectiles'

const { BaseLayer, Overlay } = LayersControl
const tileLayerbounds = new LatLngBounds([-180, -180], [180, 180])
const scaledZoom = 2

export default class ArmaMap extends Component {
  componentDidMount () {
    const { world } = this.props
    var map = this.refs.map.leafletElement
    var southWest = map.unproject([0, 0], world.zoom[1])
    var northEast = map.unproject([world.size[0], world.size[1]], world.zoom[1])
    map.setMaxBounds(new LatLngBounds(southWest, northEast))

    const tileLayer = new L.TileLayer(world.tileUrl, { bounds: tileLayerbounds });
    new MiniMap(tileLayer, { autoToggleDisplay: true, zoomLevelFixed: 0 }).addTo(map)
  }

  getChildContext () {
    const { world } = this.props

    return {
      world: world
    }
  }

  render () {
    const { children, projectiles, units, vehicles, world } = this.props

    return (
      <Map
        id='map'
        ref='map'
        center={[0, 0]}
        minZoom={world.zoom[0]}
        maxZoom={world.zoom[1] + scaledZoom}
        zoom={world.zoom[0]}
      >
        <LayersControl position='topright'>
          <BaseLayer checked name={world.name}>
            <TileLayer
              ref='tileLayer'
              url={world.tileUrl}
              bounds={tileLayerbounds}
              continuousWorld
              noWrap
              minZoom={world.zoom[0]}
              maxNativeZoom={world.zoom[1]}
              maxZoom={world.zoom[1] + scaledZoom}
            />
          </BaseLayer>

          <Overlay checked name='Projectiles'>
            <LayerGroup key={'projectiles'}>
              <ArmaProjectiles projectiles={projectiles} />
            </LayerGroup>
          </Overlay>

          <Overlay checked name='Units'>
            <LayerGroup key={'units'}>
              <ArmaMarkers markers={units} />
            </LayerGroup>
          </Overlay>

          <Overlay checked name='Vehicles'>
            <LayerGroup key={'vehicles'}>
              <ArmaMarkers markers={vehicles} />
            </LayerGroup>
          </Overlay>
        </LayersControl>

        {children}
      </Map>
    )
  }
};

ArmaMap.childContextTypes = {
  world: PropTypes.object.isRequired
}

ArmaMap.propTypes = {
  projectiles: PropTypes.array.isRequired,
  units: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  world: PropTypes.object.isRequired
}
