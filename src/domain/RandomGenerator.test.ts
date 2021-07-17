import { RealRandomGenerator } from "./RandomGenerator";

describe("randomPercentageSuccess", () => {
  it("returns true for randomPercentageSuccess with 100%", () => {
    const generator = new RealRandomGenerator();
    for (let i = 0; i < 5; i++) {
      expect(generator.randomPercentageSuccess(100)).toBeTruthy();
    }
  });

  it("returns false for randomPercentageSuccess with 0%", () => {
    const generator = new RealRandomGenerator();
    for (let i = 0; i < 5; i++) {
      expect(generator.randomPercentageSuccess(0)).toBeFalsy();
    }
  });

  it("throws an error for randomPercentageSuccess not a valid percentage", () => {
    const generator = new RealRandomGenerator();
    function negativeNumber() {
      generator.randomPercentageSuccess(-1);
    }
    expect(negativeNumber).toThrow();
    function tooBigNumber() {
      generator.randomPercentageSuccess(101);
    }
    expect(tooBigNumber).toThrow();
  });
});

describe("randomBetweenTwoValues", () => {
  it("returns correct value when min and max are the same value", () => {
    const generator = new RealRandomGenerator();
    for (let i = 0; i < 5; i++) {
      expect(generator.randomBetweenTwoValues(1300, 1300)).toEqual(1300);
    }
  });

  it("returns a value between min and max", () => {
    const generator = new RealRandomGenerator();
    for (let i = 0; i < 5; i++) {
      const value = generator.randomBetweenTwoValues(500, 2000);
      expect(value).toBeGreaterThanOrEqual(500);
      expect(value).toBeLessThanOrEqual(2000);
    }
  });
});
