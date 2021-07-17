import { FakeDateTime } from "./DateTime";
import { Game } from "./Game";
import { Location } from "./Robot";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

it(`moves the requested robot to the requested location`, async () => {
  const dateTime = new FakeDateTime();
  const game = new Game(dateTime);
  game.start();
  game.setRobotNextLocation(0, Location.FOO_MINE);
  await delay(50);
  dateTime.advance(5000);
  await delay(50);
  expect(game.getRobotLocation(0)).toEqual(Location.FOO_MINE);
});
