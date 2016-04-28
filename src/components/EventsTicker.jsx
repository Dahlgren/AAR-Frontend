import { Component } from 'react';
import { tickEvents } from '../actions/events';

export default class EventsTicker extends Component {

  componentDidMount() {
    this.timer = setInterval(this.tick, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    tickEvents(1000);
  }

  render() {
    return null;
  }
}
