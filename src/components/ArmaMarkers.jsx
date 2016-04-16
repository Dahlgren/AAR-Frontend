import { divIcon } from 'leaflet';
import _ from 'lodash';
import React from 'react';
import { Popup } from 'react-leaflet';
import RotationMarker from './RotationMarker';

const icon = function (className, size) {
  return divIcon({
    className: className,
    iconSize: size,
  })
}

const ArmaMarker = ({ map, className, markerSize, name, rotation, x, y }) => (
  <RotationMarker
    map={map}
    icon={icon(className, markerSize)}
    position={map.unproject([x, y], map.getMaxZoom())}
    rotation={rotation}
    title={name}
  >
    <Popup>
      <span>{name}</span>
    </Popup>
</RotationMarker>
);

export const ArmaMarkers = ({ map, markers }) => {
  const items = _.valuesIn(markers).map(({ id, ...props }) => (
      <ArmaMarker key={id} map={map} {...props} />
  ));
  return <div style={{display: 'none'}}>{items}</div>;
};
