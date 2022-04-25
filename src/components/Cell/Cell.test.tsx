import React, { Dispatch, SetStateAction } from "react";
import { screen, render } from "@testing-library/react";
import Cell from "./Cell";
import { Piece } from "../../chess/pieces/piece";

describe("Cell", () => {
  const setup = () =>
    render(
      <Cell
        light={false}
        position={{ x: 1, y: 1 }}
        setBoard={{} as Dispatch<SetStateAction<(Piece | null)[][]>>}
        setPromotablePiece={{} as Dispatch<SetStateAction<Piece | null>>}
      />
    );

  beforeEach(() => setup());

  it("should render a cell", () => {
    expect(screen.getByTestId("cell")).toBeTruthy();
  });
});
