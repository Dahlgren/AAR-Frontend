import React from 'react';
import { Polyline } from 'react-leaflet';

export class ArmaProjectile extends React.Component {
  render() {
    const { positions, color, weight } = this.props
    const map = this.context.map

    const projectedPositions = positions.map(function (position) {
      return map.unproject([position.x, position.y], map.getMaxZoom())
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
  map: React.PropTypes.object.isRequired,
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
