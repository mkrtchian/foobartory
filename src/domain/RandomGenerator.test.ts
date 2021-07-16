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
