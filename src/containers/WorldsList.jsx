import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import Worlds from '../components/Worlds'

class WorldsList extends Component {
  render () {
    const { worlds } = this.props

    const worldsList = (
      <div>
        <Worlds worlds={worlds} />
      </div>
    )

    return (
      <Grid>
        {worldsList}
      </Grid>
    )
  }
};

WorldsList.propTypes = {
  worlds: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  const {
    worlds
  } = state.worlds || {
    worlds: []
  }

  return {
    worlds
  }
}

export default connect(mapStateToProps)(WorldsList)
