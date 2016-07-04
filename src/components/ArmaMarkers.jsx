import { divIcon } from 'leaflet';
import React from 'react';
import { Popup } from 'react-leaflet';
import RotationMarker from './RotationMarker';

const icon = function (className, size) {
  return divIcon({
    className: className,
    iconSize: size,
  })
}

export class ArmaMarker extends React.Component {

  render() {
    const { className, markerSize, name, rotation, x, y } = this.props
    const { map, world } = this.context

    return (
      <RotationMarker
        icon={icon(className, markerSize)}
        position={map.unproject([x, y], world.zoom[1])}
        rotation={rotation}
        title={name}
      >
        <Popup>
          <span>{name}</span>
        </Popup>
      </RotationMarker>
    );
  }
}

ArmaMarker.contextTypes = {
  map: React.PropTypes.object.isRequired,
  world: React.PropTypes.object.isRequired,
};

export class ArmaMarkers extends React.Component {
  render() {
    const { markers } = this.props
    const items = markers.map(({ id, ...props }) => (
        <ArmaMarker key={id} {...props} />
    ));
    return (
      <div style={{display: 'none'}}>{items}</div>
    );
  }
};
