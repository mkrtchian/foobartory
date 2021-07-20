import { render } from "@testing-library/react";
import Foobartory from "./Foobartory";

test("displays main components", () => {
  const { getByText } = render(<Foobartory />);
  const stats = getByText(/Foos/);
  expect(stats).toBeInTheDocument();
});
