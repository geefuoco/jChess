import React from "react";
import { screen, render } from "@testing-library/react";
import Board from "./Board";

describe("Board", () => {
  const setup = () => render(<Board />);

  beforeEach(() => setup());

  it("should render the component", () => {
    expect(screen.getByTestId("board")).toBeTruthy();
  });
});
