import { render, screen } from "@testing-library/react";
import React from "react";
import Foobartory from "./Foobartory";

test("renders learn react link", () => {
  render(<Foobartory />);
  const app = screen.getByText(/App/i);
  expect(app).toBeInTheDocument();
});
