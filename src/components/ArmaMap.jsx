import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Map, LayerGroup, TileLayer } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { ArmaMarkers } from './ArmaMarkers';
import { ArmaProjectiles } from './ArmaProjectiles';

export default class ArmaMap extends Component {
  componentDidMount() {
    const { world } = this.props;
    var map = this.refs.map.getLeafletElement();
    var southWest = map.unproject([0, world.size[0]], map.getMaxZoom());
    var northEast = map.unproject([world.size[1], 0], map.getMaxZoom());
    map.setMaxBounds(new LatLngBounds(southWest, northEast));
  }

  render() {
    const { projectiles, units, vehicles, world } = this.props;

    return (
      <Map id='map' ref='map' center={[0, 0]} fullscreenControl={true} minZoom={world.zoom[0]} maxZoom={world.zoom[1]} zoom={world.zoom[0]}>
        <TileLayer ref='tileLayer' noWrap='true' url={world.tileUrl} />

        <LayerGroup key={'projectiles'}>
          <ArmaProjectiles projectiles={projectiles} />
        </LayerGroup>

        <LayerGroup key={'units'}>
          <ArmaMarkers markers={units} />
        </LayerGroup>

        <LayerGroup key={'vehicles'}>
          <ArmaMarkers markers={vehicles} />
        </LayerGroup>
      </Map>
    );
  }
};

ArmaMap.propTypes = {
  projectiles: PropTypes.array.isRequired,
  units: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  world: PropTypes.object.isRequired,
}
