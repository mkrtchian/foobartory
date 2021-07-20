class IncrementableMap<T> extends Map<T, number> {
  increment(key: T) {
    this.has(key) && this.set(key, (this.get(key) as number) + 1);
  }
  decrement(key: T) {
    this.has(key) && this.set(key, (this.get(key) as number) - 1);
  }
}

export { IncrementableMap };
