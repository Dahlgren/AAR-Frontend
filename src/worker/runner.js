const RUNNER_STATES = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
}

export default class Runner {
  constructor(events, emitState) {
    this.events = events;
    this.emitState = emitState;

    this.currentState = {};
    this.runnerState = RUNNER_STATES.STOPPED;

    this.currentIndex = 0;
    if (this.events.length > 0) {
      this.startTime = this.events[0].timestamp.getTime();
      this.currentTime = this.startTime;
      this.start();
    }
  }

  seek(time) {
    this.currentIndex = 0;
    this.currentState = {};
    this.currentTime = time;
    this.stop();
    this.updateState();
    this.start();
  }

  start() {
    this.runnerState = RUNNER_STATES.PLAYING;
    this.tick();
  }

  stop() {
    this.runnerState = RUNNER_STATES.STOPPED;
    clearTimeout(this.ticker);
  }

  tick() {
    if (this.currentIndex < this.events.length) {
      this.currentTime += 1000;
      this.updateState();

      if (this.runnerState === RUNNER_STATES.PLAYING) {
        var self = this;
        this.ticker = setTimeout(function(){
          self.tick();
        }, 100);
      }
    }
  }

  updateState() {
    let currentEvent = this.events[this.currentIndex];
    while (this.currentIndex < this.events.length && currentEvent.timestamp.getTime() < this.currentTime) {
      currentEvent = this.events[this.currentIndex];
      this.currentState[currentEvent.id] = currentEvent;
      this.currentIndex++;
    }

    this.emitState({
      markers: Object.keys(this.currentState).map((k) => this.currentState[k]),
      time: {
        start: this.startTime,
        current: this.currentTime,
        end: this.events[this.events.length - 1].timestamp.getTime(),
      }
    });
  }
}
