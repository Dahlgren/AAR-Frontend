import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Map, Popup, TileLayer } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import ArmaMarker from './ArmaMarker';

const position = [0, 0];
export default class ArmaMap extends Component {
  componentDidMount() {
    var map = this.refs.map.getLeafletElement();
    var southWest = map.unproject([0, 32769], map.getMaxZoom());
		var northEast = map.unproject([30718, 2048], map.getMaxZoom());
		map.setMaxBounds(new LatLngBounds(southWest, northEast));
  }

  render() {
    return (
      <Map id='map' ref='map' center={position} minZoom={0} maxZoom={7} zoom={2}>
        <TileLayer ref='tileLayer' tms='true' url='http://anzacsquad.com/map/altis/altis/{z}/{x}/{y}.png' />

        {this.props.markers.map((marker, i) =>
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
}
