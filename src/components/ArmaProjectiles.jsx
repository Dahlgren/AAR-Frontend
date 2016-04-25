import React from 'react';
import { Polyline } from 'react-leaflet';

const ArmaProjectile = ({ map, layerContainer, positions, color, weight }) => (
  <Polyline
    map={map}
    layerContainer={layerContainer}
    color={color}
    positions={positions.map(function (position) {
      return map.unproject([position.x, position.y], map.getMaxZoom())
    })}
    weight={weight}
  />
);

export const ArmaProjectiles = ({ map, layerContainer, projectiles }) => {
  const items = projectiles.map(({ id, ...props }) => (
      <ArmaProjectile key={id} map={map} layerContainer={layerContainer} {...props} />
  ));
  return <div style={{display: 'none'}}>{items}</div>;
};
