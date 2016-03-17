import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Map, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds, divIcon } from 'leaflet';
import ArmaMarker from './ArmaMarker';

const icon = function (className, size) {
  return divIcon({
    className: className,
    iconSize: size,
  })
}

export default class ArmaMap extends Component {
  componentDidMount() {
    const { markers, world } = this.props;
    var map = this.refs.map.getLeafletElement();
    var southWest = map.unproject([0, world.size[0]], map.getMaxZoom());
    var northEast = map.unproject([world.size[1], 0], map.getMaxZoom());
    map.setMaxBounds(new LatLngBounds(southWest, northEast));
  }

  render() {
    const { markers, world } = this.props;

    return (
      <Map id='map' ref='map' center={[0, 0]} fullscreenControl={true} minZoom={world.zoom[0]} maxZoom={world.zoom[1]} zoom={world.zoom[0]}>
        <TileLayer ref='tileLayer' noWrap='true' url={world.tileUrl} />

        {markers.map((marker, i) =>
          <ArmaMarker key={marker.id} icon={icon(marker.className, marker.markerSize)} position={[marker.x, marker.y]} rotation={marker.rotation} title={marker.name} />
        )}
      </Map>
    );
  }
};

ArmaMap.propTypes = {
  markers: PropTypes.array.isRequired,
  world: PropTypes.object.isRequired,
}
