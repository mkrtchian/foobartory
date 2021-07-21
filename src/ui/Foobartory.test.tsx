import { render } from "@testing-library/react";
import Foobartory from "./Foobartory";

test("displays main components", () => {
  const { getByText } = render(<Foobartory />);
  const statistics = getByText(/Foos/);
  expect(statistics).toBeInTheDocument();
  const robotsLocations = getByText(/Moving/);
  expect(robotsLocations).toBeInTheDocument();
  const probabilityCommands = getByText(/Probability to move/);
  expect(probabilityCommands).toBeInTheDocument();
});
