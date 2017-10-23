import PropTypes from 'prop-types'
import { Component } from 'react'
import { tickEvents } from '../actions/events'

export default class EventsTicker extends Component {
  componentWillMount () {
    if (this.props.isPlaying) {
      this.timer = setInterval(this.tick.bind(this), 1000 / this.props.speed)
    }
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.speed !== this.props.speed) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000 / nextProps.speed)
      }
    }

    if (nextProps.isPlaying !== this.props.isPlaying) {
      if (nextProps.isPlaying) {
        if (!this.timer) {
          this.timer = setInterval(this.tick.bind(this), 1000 / nextProps.speed)
        }
      } else {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    }
  }

  tick () {
    if (this.props.isPlaying) {
      tickEvents(1000)
    }
  }

  render () {
    return null
  }
}

EventsTicker.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired
}
