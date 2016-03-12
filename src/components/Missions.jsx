import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Missions extends Component {
  render() {
    return (
      <div>
        {this.props.missions.map((mission, i) =>
          <div key={mission.id}>
            <Link to={"/missions/" + mission.id}>
              {mission.name} on {mission.world}
            </Link>
          </div>
        )}
      </div>
    );
  }
}

Missions.propTypes = {
  missions: PropTypes.array.isRequired
}
