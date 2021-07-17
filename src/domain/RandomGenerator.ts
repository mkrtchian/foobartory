interface RandomGenerator {
  /**
   * Compute a boolean according to a given percentage.
   * @param percentage the percentage of chances to be true
   *     (value between 0 and 100).
   */
  randomPercentageSuccess(percentage: number): boolean;

  /**
   * Compute a value between two given values
   */
  randomBetweenTwoValues(min: number, max: number): number;
}

class RealRandomGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    if (percentage < 0 || percentage > 100) {
      throw new Error(
        `The given percentage has to be between 0 and 100, not ${percentage}.`
      );
    }
    const random = Math.random() * 100;
    if (random < percentage) {
      return true;
    } else {
      return false;
    }
  }

  randomBetweenTwoValues(min: number, max: number): number {
    const value = min + Math.random() * (max - min);
    return value;
  }
}

/**
 * Fake generator always returning true or max, used for tests.
 */
class SuccessGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return true;
  }

  randomBetweenTwoValues(min: number, max: number): number {
    return max;
  }
}

/**
 * Fake generator always returning false or min, used for tests.
 */
class FailureGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return false;
  }

  randomBetweenTwoValues(min: number, max: number): number {
    return min;
  }
}

export { RealRandomGenerator, SuccessGenerator, FailureGenerator };
export type { RandomGenerator };
