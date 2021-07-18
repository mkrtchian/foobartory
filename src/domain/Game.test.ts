import { FakeDateTime } from "./DateTime";
import { Game } from "./Game";
import { FailureGenerator } from "./RandomGenerator";
import { Location } from "./Robot";
import { BasicStrategy } from "./Strategy";

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
