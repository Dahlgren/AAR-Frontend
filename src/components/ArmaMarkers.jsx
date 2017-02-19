import React from 'react';
import { Popup } from 'react-leaflet';
import RotationMarker from './RotationMarker';

export class ArmaMarker extends React.Component {

  render() {
    const { className, markerSize, name, rotation, x, y } = this.props
    const { map, world } = this.context

    return (
      <RotationMarker
        className={className}
        markerSize={markerSize}
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
