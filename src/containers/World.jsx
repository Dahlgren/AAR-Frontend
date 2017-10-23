import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import ArmaMap from '../components/ArmaMap'
import worlds from '../data/worlds'

class World extends Component {
  render () {
    const { params, world } = this.props

    return (
      <div id='map-container'>
        {!world &&
          <Grid>
            <h2>World {params.id} is not configured</h2>
          </Grid>
        }
        {world &&
          <div className='flex'>
            <ArmaMap
              projectiles={[]}
              units={[]}
              vehicles={[]}
              world={world}
            />
          </div>
        }
      </div>
    )
  }
}

World.propTypes = {
  world: PropTypes.object
}

function mapStateToProps (state, ownProps) {
  const world = worlds[ownProps.params.id]

  return {
    world
  }
}

export default connect(mapStateToProps)(World)
