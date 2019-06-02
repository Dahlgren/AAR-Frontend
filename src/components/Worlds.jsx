import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Worlds extends Component {
  render () {
    const { worlds } = this.props

    return (
      <Table striped>
        <thead>
          <tr>
            <th>World</th>
          </tr>
        </thead>
        <tbody>
          {worlds.map((world, i) =>
            <tr key={world.name}>
              <td>
                <Link to={'/worlds/' + world.name}>
                  {world.title}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

Worlds.propTypes = {
  worlds: PropTypes.array.isRequired
}
