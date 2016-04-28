export default class Runner {
  constructor(events, emitState) {
    this.events = events;
    this.emitState = emitState;

    this.resetState();

    if (this.events.length > 0) {
      this.startTime = this.events[0].timestamp.getTime();
      this.currentTime = this.startTime;
      this.tick(1000);
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
    this.tick(1000);
  }

  tick(amount) {
    if (this.currentIndex < this.events.length) {
      this.currentTime += amount;
      this.updateState();
    }
  }

  updateState() {
    let currentEvent = this.events[this.currentIndex];
    while (this.currentIndex < this.events.length && currentEvent.timestamp.getTime() < this.currentTime) {
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

    this.emitState({
      projectiles: Object.keys(this.currentState.projectiles).map((k) => this.currentState.projectiles[k]),
      units: Object.keys(this.currentState.units).map((k) => this.currentState.units[k]),
      vehicles: Object.keys(this.currentState.vehicles).map((k) => this.currentState.vehicles[k]),
      time: {
        start: this.startTime,
        current: this.currentTime,
        end: this.events[this.events.length - 1].timestamp.getTime(),
      }
    });
  }

  removeOldProjectiles() {
    var self = this;
    Object.keys(this.currentState.projectiles).map(function (projectileKey) {
      const projectile = self.currentState.projectiles[projectileKey];
      if (projectile.timestamp.getTime() < self.currentTime - 10000) {
        delete self.currentState.projectiles[projectileKey];
      }
    });
  }
}
