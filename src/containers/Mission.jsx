import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import { render } from 'react-dom';
import FullscreenControl from 'react-leaflet-fullscreen';
import { connect } from 'react-redux';
import { LatLng } from 'leaflet';
import ArmaMap from '../components/ArmaMap';
import EventsTicker from '../components/EventsTicker';
import { loadEvents, seekEvents, stopEvents } from '../actions/events';
import { fetchMissionsIfNeeded } from '../actions/missions';
import worlds from '../data/worlds';

export default class Mission extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchMissionsIfNeeded());
    dispatch(loadEvents(params.id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(stopEvents());
  }

  render() {
    const { mission, projectiles, units, vehicles, isFetching, lastUpdated, time, world } = this.props;

    return (
      <div id="map-container">
        {mission && !world &&
          <Grid>
            <h2>World {mission.world} is not configured</h2>
          </Grid>
        }
        {world && isFetching &&
          <Grid>
            <h2>Loading...</h2>
          </Grid>
        }
        {world && !isFetching && (projectiles.length + units.length + vehicles.length) === 0 &&
          <Grid>
            <h2>No events</h2>
          </Grid>
        }
        {world && time &&
          <div className="flex">
            <ArmaMap
              projectiles={projectiles}
              units={units}
              vehicles={vehicles}
              world={world}
            >
              <FullscreenControl position="topleft" />
            </ArmaMap>
            <EventsTicker />
            <input
              type="range"
              min={time.start}
              max={time.end}
              value={time.current}
              onChange={this.seek.bind(this)}
            />
          </div>
        }
      </div>
    )
  }

  seek(event) {
    const newCurrentTime = parseInt(event.target.value, 10);
    seekEvents(newCurrentTime);
  }
}

Mission.propTypes = {
  projectiles: PropTypes.array.isRequired,
  units: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  time: PropTypes.object,
  world: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { events, missions } = state
  const {
    isFetching,
    projectiles,
    units,
    vehicles,
    time,
  } = events || {
    isFetching: true,
    projectiles: [],
    units: [],
    vehicles: [],
    time: null,
  }

  let mission = null;
  let world = null;
  if (state.missions.missionsById && state.missions.missionsById[ownProps.params.id]) {
    mission = state.missions.missionsById[ownProps.params.id];
    world = worlds[mission.world.toLowerCase()];
  }

  return {
    isFetching,
    mission,
    projectiles,
    units,
    vehicles,
    time,
    world,
  }
}

export default connect(mapStateToProps)(Mission)
