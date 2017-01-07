import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { render } from 'react-dom';
import Control from 'react-leaflet-control';
import FullscreenControl from 'react-leaflet-fullscreen';
import { connect } from 'react-redux';
import { LatLng } from 'leaflet';
import ArmaMap from '../components/ArmaMap';
import EventsTicker from '../components/EventsTicker';
import { loadEvents, seekEvents, stopEvents } from '../actions/events';
import { fetchMissionsIfNeeded } from '../actions/missions';
import worlds from '../data/worlds';

class Mission extends Component {
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
              <Control className="leaflet-bar leaflet-control-slider" position="bottomleft">
                <ReactBootstrapSlider
                  value={time.current}
                  slideStop={this.seek.bind(this)}
                  step={1}
                  max={Math.max(time.start + mission.length * 1000, time.end)}
                  min={time.start}
                  rangeHighlights={[{start: time.start, end: time.end}]}
                  tooltip={'hide'}
                />
              </Control>
            </ArmaMap>
            <EventsTicker />
          </div>
        }
      </div>
    )
  }

  seek(event) {
    const { time } = this.props;
    const newCurrentTime = Math.min(parseInt(event.target.value, 10), time.end);
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
