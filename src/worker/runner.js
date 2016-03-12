export default class Runner {
  constructor(events, emitState) {
    this.events = events;
    this.emitState = emitState;

    this.currentState = {};

    this.currentIndex = 0;
    if (this.events.length > 0) {
      this.start = this.events[0].timestamp.getTime();
      this.currentTime = this.start;

      this.tick();
    }
  }

  tick() {
    this.currentTime += 15000;

    let currentEvent = this.events[this.currentIndex];
    while (this.currentIndex < this.events.length && currentEvent.timestamp.getTime() < this.currentTime) {
      currentEvent = this.events[this.currentIndex];
      this.currentState[currentEvent.id] = currentEvent;
      this.currentIndex++;
    }

    this.emitState(Object.keys(this.currentState).map((k) => this.currentState[k]));

    if (this.currentIndex < this.events.length) {
      var self = this;
      setTimeout(function(){
        self.tick();
      }, 1000)
    }
  }
}
