import moment from 'moment';
import 'moment-duration-format';
import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { render } from 'react-dom';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class TimeControl extends Component {
  render() {
    const { mission, time, seek } = this.props;
    const duration = (time.current - time.start) / 1000;
    const length = mission.length;

    return (
      <div>
        <div>
          <dl className="pull-left">
            <dt>
              Mission
            </dt>
            <dd>
              {mission.name}
            </dd>
          </dl>
          <dl className="pull-right">
            <dt>
              Total Time
            </dt>
            <dd>
              { moment.duration(length, 'seconds').format('h[h] mm[m] s[s]') }
            </dd>
          </dl>
          <dl className="pull-right" style={{marginRight: '10px'}}>
            <dt>
              Current Time
            </dt>
            <dd>
              { moment.duration(duration, 'seconds').format('h[h] mm[m] s[s]') }
            </dd>
          </dl>
        </div>
        <div>
          <ReactBootstrapSlider
            value={time.current}
            slideStop={seek}
            step={1}
            max={Math.max(time.start + mission.length * 1000, time.end)}
            min={time.start}
            rangeHighlights={[{start: time.start, end: time.end}]}
            tooltip={'hide'}
          />
        </div>
      </div>
    );
  }
}

TimeControl.propTypes = {
  mission: PropTypes.object.isRequired,
  seek: PropTypes.func.isRequired,
  time: PropTypes.object.isRequired,
}
