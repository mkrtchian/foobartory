interface Timer {
  getCurrentTime(): number;
}

class FakeTimer implements Timer {
  constructor(private time: number = 0) {}
  advance(miliseconds: number) {
    this.time += miliseconds;
  }

  getCurrentTime(): number {
    return this.time;
  }
}

class RealTimer implements Timer {
  getCurrentTime(): number {
    return Date.now();
  }
}

export { FakeTimer, RealTimer };
export type { Timer };
