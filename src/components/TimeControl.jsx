import moment from 'moment'
import 'moment-duration-format'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import { BsPause, BsPlay } from 'react-icons/bs'

const speeds = [1, 10, 100]

export default class TimeControl extends Component {
  render () {
    const { isPlaying, mission, seek, speed, time } = this.props
    const duration = (time.current - time.start) / 1000
    const length = Math.max(mission.length, (time.end - time.start) / 1000)
    const playButtonIcon = isPlaying ? <BsPause /> : <BsPlay />

    return (
      <div>
        <div>
          <dl className='pull-left' style={{ marginBottom: 0 }}>
            <dt>
              Mission
            </dt>
            <dd>
              {mission.name}
            </dd>
          </dl>
          <dl className='pull-right' style={{ marginBottom: 0 }}>
            <dt>
              Total Time
            </dt>
            <dd>
              {moment.duration(length, 'seconds').format('h[h] mm[m] s[s]')}
            </dd>
          </dl>
          <dl className='pull-right' style={{ marginBottom: 0, marginRight: '10px' }}>
            <dt>
              Current Time
            </dt>
            <dd>
              {moment.duration(duration, 'seconds').format('h[h] mm[m] s[s]')}
            </dd>
          </dl>
          <div className='pull-right' style={{ marginRight: '10px' }}>
            <Button bsSize='small' onClick={this.props.togglePlaying.bind(this)}>
              {playButtonIcon}
            </Button>
            &nbsp;
            <ButtonGroup>
              {speeds.map((desiredSpeed) => {
                return (
                  <Button
                    active={desiredSpeed === speed}
                    bsSize='small'
                    onClick={this.props.setSpeed.bind(this, desiredSpeed)}
                    key={desiredSpeed}
                  >{desiredSpeed}x
                  </Button>
                )
              })}
            </ButtonGroup>
          </div>
        </div>
        <div>
          <ReactBootstrapSlider
            value={time.current}
            slideStop={seek}
            step={1}
            max={Math.max(time.start + mission.length * 1000, time.end)}
            min={time.start}
            rangeHighlights={[{ start: time.start, end: time.end }]}
            tooltip='hide'
          />
        </div>
      </div>
    )
  }
}

TimeControl.propTypes = {
  mission: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  seek: PropTypes.func.isRequired,
  setSpeed: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  togglePlaying: PropTypes.func.isRequired
}
