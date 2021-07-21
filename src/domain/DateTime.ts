interface DateTime {
  getCurrentTime(): number;
}

class FakeDateTime implements DateTime {
  constructor(private time: number = 0) {}

  advance(miliseconds: number) {
    this.time += miliseconds;
  }

  getCurrentTime(): number {
    return this.time;
  }
}

class RealDateTime implements DateTime {
  getCurrentTime(): number {
    return Date.now();
  }
}

export { FakeDateTime, RealDateTime };
export type { DateTime };
