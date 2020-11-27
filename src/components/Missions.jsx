import moment from 'moment'
import 'moment-duration-format'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsExclamationTriangle } from 'react-icons/bs'

export default class Missions extends Component {
  renderWorldName (mission) {
    const { worldsByName } = this.props
    const world = worldsByName[mission.world.toLowerCase()]

    if (!world) {
      return (
        <div>
          <span>{mission.world}</span>
          &nbsp;
          <BsExclamationTriangle />
        </div>
      )
    }

    return world.title
  }

  render () {
    const { missions } = this.props

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Mission</th>
            <th>World</th>
            <th>Length</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, i) =>
            <tr key={mission.id}>
              <td>
                <Link to={'/missions/' + mission.id}>
                  {mission.name}
                </Link>
              </td>
              <td>
                {this.renderWorldName(mission)}
              </td>
              <td>
                {moment.duration(mission.length, 'seconds').format('h[h] mm[m]')}
              </td>
              <td>
                {moment(mission.created_at).format('YYYY-MM-DD HH:mm')}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

Missions.propTypes = {
  missions: PropTypes.array.isRequired,
  worldsByName: PropTypes.object.isRequired
}
