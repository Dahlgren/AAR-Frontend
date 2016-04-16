import React from 'react';
import { Polyline } from 'react-leaflet';

const ArmaProjectile = ({ map, positions, color, weight }) => (
  <Polyline
    map={map}
    color={color}
    positions={positions.map(function (position) {
      return map.unproject([position.x, position.y], map.getMaxZoom())
    })}
    weight={weight}
  />
);

export const ArmaProjectiles = ({ map, projectiles }) => {
  const items = projectiles.map(({ id, ...props }) => (
      <ArmaProjectile key={id} map={map} {...props} />
  ));
  return <div style={{display: 'none'}}>{items}</div>;
};
