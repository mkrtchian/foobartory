import { RealRandomGenerator } from "./RandomGenerator";

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
