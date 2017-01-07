import React, { Component, PropTypes } from 'react';
import { Grid, Pagination } from 'react-bootstrap';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { invalidateMissions, fetchMissionsIfNeeded, setMissionsPage } from '../actions/missions';
import Missions from '../components/Missions';

const REQUIRED_MISSION_LENGTH = 60;
const MISSIONS_PER_PAGE = 20;

class MissionsList extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handlePageSelect = this.handlePageSelect.bind(this)
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

  handlePageSelect(page) {
    const { dispatch } = this.props
    dispatch(setMissionsPage(page));
  }

  render() {
    const { missions, page, isFetching, lastUpdated } = this.props;

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

    const filteredMissions = missions.filter(mission => mission.length > REQUIRED_MISSION_LENGTH);
    const pages = Math.ceil(filteredMissions.length / MISSIONS_PER_PAGE);
    const paginatedMissions = filteredMissions.slice((page - 1) * MISSIONS_PER_PAGE, page * MISSIONS_PER_PAGE);
    const missionsList = (
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Missions missions={paginatedMissions} />

        <div className="text-center">
          <Pagination
            items={pages}
            activePage={page}
            boundaryLinks={true}
            maxButtons={10}
            onSelect={this.handlePageSelect} />
        </div>
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
    missions,
    page,
  } = state.missions || {
    isFetching: true,
    missions: [],
    page: 1
  }

  return {
    missions,
    isFetching,
    lastUpdated,
    page,
  }
}

export default connect(mapStateToProps)(MissionsList)
