import { MOVING } from "../actions";
import { FakeDateTime } from "../DateTime";
import { Game, MAX_ROBOTS } from "../Game";
import Location from "../locations";
import { FailureGenerator } from "../RandomGenerator";
import { BasicStrategy, INITIAL_WEIGHTS } from "../Strategy";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

it(`moves the requested robot to the requested location`, async () => {
  const dateTime = new FakeDateTime();
  const randomGenerator = new FailureGenerator();
  const game = new Game(new BasicStrategy({ randomGenerator }), { dateTime });
  game.start();
  game.setRobotNextLocation(0, Location.FOO_MINE);
  await delay(50);
  dateTime.advance(MOVING.totalDuration);
  await delay(50);
  expect(game.getRobotLocation(0)).toEqual(Location.FOO_MINE);
});

it(`returns the current time from the internal timer when the game is 
started, and throws an exception when it is stopped.`, async () => {
  const dateTime = new FakeDateTime(50);
  const game = new Game(new BasicStrategy(), { dateTime });
  game.start();
  expect(game.getCurrentTime()).toEqual(50);
  game.stop();
  function getTimeThrow() {
    game.getCurrentTime();
  }
  expect(getTimeThrow).toThrowError("The game is not started");
});

const maybe = process.env.INTEGRATION_TESTING ? it : it.skip;

maybe(
  `plays automatically until MAX_ROBOTS robots are build`,
  async () => {
    const dateTime = new FakeDateTime();
    const strategy = new BasicStrategy();
    strategy.setLocationWeight(Location.FOO_MINE, INITIAL_WEIGHTS.fooMine * 3);
    strategy.setAutomaticMovementProbability(INITIAL_WEIGHTS.barMine / 2);
    const game = new Game(strategy, { dateTime });
    game.start();
    for (let i = 0; i < 5000; i++) {
      dateTime.advance(MOVING.totalDuration as number);
      await delay(10);
      if (game.store.getRobots().length >= MAX_ROBOTS) {
        break;
      }
    }
    expect(game.store.getRobots().length).toBeGreaterThanOrEqual(MAX_ROBOTS);
    expect(game.getStarted()).toBeFalsy();
  },
  50000
);
