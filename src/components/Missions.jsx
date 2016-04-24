import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import worlds from '../data/worlds';

export default class Missions extends Component {
  render() {
    return (
      <Table striped>
      <thead>
        <tr>
          <th>Mission</th>
          <th>World</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
          {this.props.missions.map((mission, i) =>
            <tr key={mission.id}>
              <td>
                <Link to={"/missions/" + mission.id}>
                  {mission.name}
                </Link>
              </td>
              <td>
                { worlds[mission.world] ?
                  worlds[mission.world].name : mission.world
                }
              </td>
              <td>
                {new Date(mission.created_at).toLocaleString() }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

Missions.propTypes = {
  missions: PropTypes.array.isRequired
}
