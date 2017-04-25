import PropTypes from 'prop-types';
import React from 'react';
import { Polyline } from 'react-leaflet';

export class ArmaProjectile extends React.Component {
  render() {
    const { positions, color, weight } = this.props
    const { map, world } = this.context

    const projectedPositions = positions.slice(-2).map(function (position) {
      return map.unproject([position.x, position.y], world.zoom[1])
    })

    return (
      <Polyline
        color={color}
        positions={projectedPositions}
        weight={weight}
      ></Polyline>
    )
  }
}

ArmaProjectile.contextTypes = {
  map: PropTypes.object.isRequired,
  world: PropTypes.object.isRequired,
};

export class ArmaProjectiles extends React.Component {
  render() {
    const { projectiles } = this.props

    const items = projectiles.map(({ id, ...props }) => (
        <ArmaProjectile key={id} {...props} />
    ));

    return <div style={{display: 'none'}}>{items}</div>;
  }
}
