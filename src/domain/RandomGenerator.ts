interface RandomGenerator {
  /**
   * Computes a boolean according to a given percentage.
   * @param percentage the percentage of chances to be true.
   */
  randomPercentageSuccess(percentage: number): boolean;
}

class RealRandomGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    const random = Math.random() * 100;
    if (random < percentage) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Fake generator always returning true, used for tests.
 */
class SuccessGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return true;
  }
}

/**
 * Fake generator always returning false, used for tests.
 */
class FailureGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return false;
  }
}

export { RealRandomGenerator, SuccessGenerator, FailureGenerator };
export type { RandomGenerator };
