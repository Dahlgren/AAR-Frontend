import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import worlds from '../data/worlds';

export default class Worlds extends Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>World</th>
          </tr>
        </thead>
        <tbody>
          {this.props.worlds.map((world, i) =>
            <tr key={world.id}>
              <td>
                <Link to={"/worlds/" + world.id}>
                  {world.name}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

Worlds.propTypes = {
  worlds: PropTypes.array.isRequired
}
