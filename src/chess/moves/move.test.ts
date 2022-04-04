import { Move } from "./move";

describe("Move", () => {
  it("should return true for valid move", () => {
    const move = new Move({ x: 5, y: 5 });
    expect(move.validMove()).toBeTruthy();
  });

  it("should return false for invalid move", () => {
    const move = new Move({ x: -1, y: 4 });
    expect(move.validMove()).toBeFalsy();
  });
});
