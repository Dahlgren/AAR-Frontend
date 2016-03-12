import React, { Component, PropTypes } from 'react';
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
    const { items, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <p>
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
        </p>
        {isFetching && items.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && items.length === 0 &&
          <h2>Empty.</h2>
        }
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Missions missions={items} />
          </div>
        }
      </div>
    );
  }
};

MissionsList.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { missions } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = missions || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(MissionsList)
