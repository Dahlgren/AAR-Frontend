import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import ArmaMap from '../components/ArmaMap';
import { loadEvents, stopEvents } from '../actions/events';
import { fetchMissionsIfNeeded } from '../actions/missions';
import worlds from '../data/worlds';

export default class Mission extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchMissionsIfNeeded());
    dispatch(loadEvents(params.id));
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(stopEvents());
  }

  render() {
    const { markers, isFetching, lastUpdated, world } = this.props;
    return (
      <div id="map-container">
        {isFetching && markers.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && markers.length === 0 &&
          <h2>No events</h2>
        }
        {!isFetching && !world &&
          <h2>Mission World is not defined</h2>
        }
        {markers.length > 0 && world &&
          <ArmaMap markers={markers} world={world} />
        }
      </div>
    )
  }
}

Mission.propTypes = {
  markers: PropTypes.array.isRequired,
  world: PropTypes.object,
  timestamp: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { events, missions } = state
  const {
    isFetching,
    markers,
    timestamp,
  } = events || {
    isFetching: true,
    markers: [],
  }

  let world = null;
  if (state.missions.missionsById && state.missions.missionsById[ownProps.params.id]) {
    const mission = state.missions.missionsById[ownProps.params.id];
    world = worlds[mission.world.toLowerCase()];
  }

  return {
    isFetching,
    markers,
    timestamp,
    world,
  }
}

export default connect(mapStateToProps)(Mission)
