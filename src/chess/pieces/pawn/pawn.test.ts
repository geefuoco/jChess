import { Pawn } from "./pawn";
import { Move } from "../../moves/move";
import { ChessBoard } from "../../board/chessboard";

describe("Pawn", () => {
  let p: Pawn;
  let P: Pawn;
  beforeEach(() => {
    //B pawn
    const board = new ChessBoard();
    p = new Pawn(board, "black", { x: 1, y: 1 });
    P = new Pawn(board, "white", { x: 6, y: 1 });
  });

  it("should update its position when moved", () => {
    const move = new Move({ x: 2, y: 1 });
    p.move(move);
    expect(p.getPosition()).toStrictEqual({ x: 2, y: 1 });
  });

  it("should set the passable flag to true if the move is special", () => {
    const move = new Move({ x: 3, y: 1 }, true);
    const wMove = new Move({ x: 5, y: 1 });
    p.move(move);
    P.move(wMove);
    expect(p.getPosition()).toStrictEqual({ x: 3, y: 1 });
    expect(p.getPassable()).toBeTruthy();
    expect(P.getPassable()).toBeFalsy();
  });

  it("should generate valid moves only", () => {
    const firstMove = new Move({ x: 5, y: 1 });
    P.move(firstMove);
    const moves = P.getMoveSet();

    let specialCount = 0;
    let boundsCount = 0;
    moves.forEach((move) => {
      if (move.isSpecial()) {
        specialCount++;
      }
      if (
        move.getGoalPosition().x < 0 ||
        move.getGoalPosition().x > 7 ||
        move.getGoalPosition().y < 0 ||
        move.getGoalPosition().y > 7
      ) {
        boundsCount++;
      }
    });
    expect(specialCount).toBe(0);
    expect(boundsCount).toBe(0);
    expect(moves.length).toBe(3);
  });
});
