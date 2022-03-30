import React from "react";
import { screen, render } from "@testing-library/react";
import Cell from "./Cell";

describe("Cell", () => {
  const setup = () => render(<Cell light={false} />);

  beforeEach(() => setup());

  it("should render a cell", () => {
    expect(screen.getByTestId("cell")).toBeTruthy();
  });
});
