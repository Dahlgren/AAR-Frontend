import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Map, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import ArmaMarker from './ArmaMarker';

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
      <Map id='map' ref='map' center={[0, 0]} minZoom={world.zoom[0]} maxZoom={world.zoom[1]} zoom={world.zoom[0]}>
        <TileLayer ref='tileLayer' noWrap='true' url={world.tileUrl} />

        {markers.map((marker, i) =>
          <ArmaMarker key={marker.id} position={[marker.x, marker.y]}>
            <Popup>
              <span>{marker.name}</span>
            </Popup>
          </ArmaMarker>
        )}
      </Map>
    );
  }
};

ArmaMap.propTypes = {
  markers: PropTypes.array.isRequired,
  world: PropTypes.object.isRequired,
}
