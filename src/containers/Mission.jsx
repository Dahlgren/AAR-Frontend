import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import ArmaMap from '../components/ArmaMap';
import { loadEvents, stopEvents } from '../actions/events';

export default class Mission extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(loadEvents(params.id));
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(stopEvents());
  }

  render() {
    const { markers, isFetching, lastUpdated } = this.props;
    return (
      <ArmaMap markers={markers} />
    )
  }
}

Mission.propTypes = {
  markers: PropTypes.array.isRequired,
  timestamp: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { events } = state
  const {
    isFetching,
    markers,
    timestamp,
  } = events || {
    isFetching: true,
    markers: [],
  }

  return {
    isFetching,
    markers,
    timestamp,
  }
}

export default connect(mapStateToProps)(Mission)
