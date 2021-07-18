type WeightedValues<T> = Map<T, number>;

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

  /**
   * Choose randomly one of the provided values, according to
   * the given weights for each value.
   * If the weight is 0, the value will never be chosen, if it
   * is a positive number, the bigger it will be compared to
   * the weight of the other values, the more chances it will
   * have to be chosen.
   * @param values the chosen value.
   */
  chooseValue<T>(values: WeightedValues<T>): T;
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

  chooseValue<T>(values: WeightedValues<T>): T {
    this._checkWeights(values);
    const weightsSum = Array.from(values.values()).reduce((a, b) => a + b);
    const random = Math.random() * weightsSum;
    let chosenValue: T = values.entries().next().value;
    let sum = 0;
    for (let [key, value] of values) {
      sum += value;
      if (random <= sum) {
        chosenValue = key;
        break;
      }
    }
    return chosenValue;
  }

  private _checkWeights<T>(values: WeightedValues<T>) {
    const weights = Array.from(values.values());
    const negativeWeight = weights.some((x) => x < 0);
    if (negativeWeight) {
      const entries = Array.from(values.entries());
      throw new Error(`Negative weights are not allowed. Entries: ${entries}`);
    }
    const onlyZeroWeights = weights.every((x) => x === 0);
    if (onlyZeroWeights) {
      const entries = Array.from(values.entries());
      throw new Error(
        `At least one of the weights has to be > 0. Entries: ${entries}`
      );
    }
  }
}

/**
 * Fake generator always returning true or the maximal value,
 * used for tests.
 */
class SuccessGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return true;
  }

  randomBetweenTwoValues(min: number, max: number): number {
    return max;
  }

  chooseValue<T>(values: WeightedValues<T>): T {
    const biggestPair = [...values.entries()].reduce((v1, v2) =>
      v1[1] > v2[1] ? v1 : v2
    );
    return biggestPair[0];
  }
}

/**
 * Fake generator always returning false or the minimal value,
 * used for tests.
 */
class FailureGenerator implements RandomGenerator {
  randomPercentageSuccess(percentage: number): boolean {
    return false;
  }

  randomBetweenTwoValues(min: number, max: number): number {
    return min;
  }

  chooseValue<T>(values: WeightedValues<T>): T {
    const smallestPair = [...values.entries()].reduce((v1, v2) =>
      v1[1] < v2[1] ? v1 : v2
    );
    return smallestPair[0];
  }
}

export { RealRandomGenerator, SuccessGenerator, FailureGenerator };
export type { RandomGenerator, WeightedValues };
