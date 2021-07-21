import { RealRandomGenerator } from "../RandomGenerator";

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

describe("chooseValue", () => {
  it("throws an error when called with only 0 weights", () => {
    const generator = new RealRandomGenerator();
    const weightedValues = new Map([
      ["v1", 0],
      ["v2", 0],
      ["v3", 0],
    ]);
    function onlyZeroWeights() {
      generator.chooseValue(weightedValues);
    }
    expect(onlyZeroWeights).toThrowError(
      "At least one of the weights has to be > 0."
    );
  });

  it("throws an error when called with negative weight(s)", () => {
    const generator = new RealRandomGenerator();
    const weightedValues = new Map([
      ["v1", -2],
      ["v2", 0],
      ["v3", 5],
    ]);
    function negativeWeight() {
      generator.chooseValue(weightedValues);
    }
    expect(negativeWeight).toThrowError("Negative weights are not allowed");
  });

  it("chooses the value greater than 0 among others having a weight of 0", () => {
    const generator = new RealRandomGenerator();
    let weightedValues = new Map([
      ["v1", 0],
      ["v2", 5],
      ["v3", 0],
    ]);
    expect(generator.chooseValue(weightedValues)).toBe("v2");
    weightedValues = new Map([
      ["v1", 0],
      ["v2", 0],
      ["v3", 1],
    ]);
    expect(generator.chooseValue(weightedValues)).toBe("v3");
    weightedValues = new Map([
      ["v1", 8],
      ["v2", 0],
      ["v3", 1000],
    ]);
    expect(generator.chooseValue(weightedValues)).not.toBe("v2");
  });
});
