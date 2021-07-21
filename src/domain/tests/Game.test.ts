import { FakeDateTime } from "../DateTime";
import { Game } from "../Game";
import { FailureGenerator } from "../RandomGenerator";
import { Location } from "../Robot";
import { BasicStrategy } from "../Strategy";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

it(`moves the requested robot to the requested location`, async () => {
  const dateTime = new FakeDateTime();
  const randomGenerator = new FailureGenerator();
  const game = new Game(new BasicStrategy({ randomGenerator }), { dateTime });
  game.start();
  game.setRobotNextLocation(0, Location.FOO_MINE);
  await delay(50);
  dateTime.advance(5000);
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
  `plays automatically until 20 robots are build`,
  async () => {
    const dateTime = new FakeDateTime();
    const strategy = new BasicStrategy();
    strategy.setLocationWeight(Location.FOO_MINE, 150);
    strategy.setAutomaticMovementProbability(25);
    const game = new Game(strategy, { dateTime });
    game.start();
    for (let i = 0; i < 5000; i++) {
      dateTime.advance(5000);
      await delay(10);
      if (game.store.getRobots().length >= 20) {
        break;
      }
    }
    expect(game.store.getRobots().length).toBeGreaterThanOrEqual(20);
    expect(game.getStarted()).toBeFalsy();
  },
  50000
);