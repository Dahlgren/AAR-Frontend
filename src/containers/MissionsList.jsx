import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { invalidateMissions, fetchMissionsIfNeeded } from '../actions/missions';
import Missions from '../components/Missions';

class MissionsList extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.invalidate();
  }

  handleRefreshClick(e) {
    e.preventDefault();

    this.invalidate();
  }

  invalidate() {
    const { dispatch } = this.props
    dispatch(invalidateMissions());
    dispatch(fetchMissionsIfNeeded());
  }

  render() {
    const { missions, isFetching, lastUpdated } = this.props;

    const refreshHeader = (
      <div>
        {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>
        }
        {!isFetching &&
          <a href='#'
             onClick={this.handleRefreshClick}>
            Refresh
          </a>
        }
      </div>
    );

    const missionsList = (
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Missions missions={missions} />
      </div>
    );

    return (
      <Grid>
        {refreshHeader}
        {isFetching && missions.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && missions.length === 0 &&
          <h2>Empty.</h2>
        }
        {missions.length > 0 &&
          missionsList
        }
      </Grid>
    );
  }
};

MissionsList.propTypes = {
  missions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    missions
  } = state.missions || {
    isFetching: true,
    missions: []
  }

  return {
    missions,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(MissionsList)
