const diff = require('deep-diff').diff;

const RUNNER_STATES = {
  PLAYING: 'PLAYING',
  STOPPED: 'STOPPED',
}

function diffIgnoreTimestamp(path, key) {
  return key === 'timestamp';
};

export default class Runner {
  constructor(events, emitStateDiff) {
    this.events = events;
    this.emitStateDiff = emitStateDiff;

    this.runnerState = RUNNER_STATES.STOPPED;
    this.resetState();

    if (this.events.length > 0) {
      this.startTime = this.events[0].timestamp;
      this.currentTime = this.startTime;
      this.start();
    }
  }

  resetState() {
    this.currentIndex = 0;
    this.currentState = {
      projectiles: {},
      units: {},
      vehicles: {},
    };
  }

  seek(time) {
    this.resetState();
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
    const oldState = JSON.parse(JSON.stringify(this.currentState));

    let currentEvent = this.events[this.currentIndex];
    while (this.currentIndex < this.events.length && currentEvent.timestamp < this.currentTime) {
      currentEvent = this.events[this.currentIndex];

      if (currentEvent.type === "projectiles") {
        if (!this.currentState[currentEvent.type][currentEvent.id]) {
          this.currentState[currentEvent.type][currentEvent.id] = {
            id: currentEvent.id,
            color: currentEvent.color,
            positions: [],
            weight: currentEvent.weight,
          };
        }

        this.currentState[currentEvent.type][currentEvent.id].timestamp = currentEvent.timestamp;
        this.currentState[currentEvent.type][currentEvent.id].positions.push({
          x: currentEvent.x,
          y: currentEvent.y,
        });
      } else {
        this.currentState[currentEvent.type][currentEvent.id] = currentEvent;
      }

      this.currentIndex++;
    }

    this.removeOldProjectiles();

    this.emitStateDiff({
      projectiles: diff(oldState.projectiles, this.currentState.projectiles, diffIgnoreTimestamp) || [],
      units: diff(oldState.units, this.currentState.units, diffIgnoreTimestamp) || [],
      vehicles: diff(oldState.vehicles, this.currentState.vehicles, diffIgnoreTimestamp) || [],
      time: {
        start: this.startTime,
        current: this.currentTime,
        end: this.events[this.events.length - 1].timestamp,
      }
    });
  }

  removeOldProjectiles() {
    var self = this;
    Object.keys(this.currentState.projectiles).map(function (projectileKey) {
      const projectile = self.currentState.projectiles[projectileKey];
      if (projectile.timestamp < self.currentTime - 10000) {
        delete self.currentState.projectiles[projectileKey];
      }
    });
  }
}
