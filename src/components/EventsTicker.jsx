import PropTypes from 'prop-types'
import { Component } from 'react'

export default class EventsTicker extends Component {
  componentWillMount () {
    if (this.props.isPlaying) {
      this.timer = setTimeout(this.props.tick, 1000 / this.props.speed)
    }
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.time.current !== this.props.time.current) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = setTimeout(this.props.tick, 1000 / nextProps.speed)
      }
    }

    if (nextProps.speed !== this.props.speed) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = setTimeout(this.props.tick, 1000 / nextProps.speed)
      }
    }

    if (nextProps.isPlaying !== this.props.isPlaying) {
      if (nextProps.isPlaying) {
        if (!this.timer) {
          this.timer = setTimeout(this.props.tick, 1000 / nextProps.speed)
        }
      } else {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
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
