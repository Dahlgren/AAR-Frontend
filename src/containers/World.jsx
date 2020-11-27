import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import ArmaMap from '../components/ArmaMap'

class World extends Component {
  render () {
    const { match, world } = this.props

    return (
      <div id='map-container'>
        {!world &&
          <Container>
            <h2>World {match.params.id} is not configured</h2>
          </Container>}
        {world &&
          <div className='flex'>
            <ArmaMap
              projectiles={[]}
              units={[]}
              vehicles={[]}
              world={world}
            />
          </div>}
      </div>
    )
  }
}

World.propTypes = {
  world: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  const {
    worldsByName
  } = state.worlds || {
    worldsByName: {}
  }

  const world = worldsByName[ownProps.match.params.id]

  return {
    world
  }
}

export default connect(mapStateToProps)(World)
