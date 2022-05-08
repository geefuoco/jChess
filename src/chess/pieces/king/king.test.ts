import { King } from "./king";
import { ChessBoard } from "../../board/chessboard";
import { Queen } from "../queen/queen";

describe("King", () => {
  let k: King;
  let b: ChessBoard;
  beforeEach(() => {
    b = new ChessBoard();
    k = new King(b, "black", { x: 3, y: 3 });
  });

  it("should show valid moves for a king", () => {
    const moves = k
      .generateMoveSet()
      .map((move) => move.getGoalPosition())
      .sort((a, b) => a.x - b.x);
    const validMoves = [
      { x: 2, y: 4 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 2 },
      { x: 4, y: 4 },
      { x: 4, y: 2 },
      { x: 4, y: 3 }
    ];
    expect(moves).toEqual(validMoves);
  });

  it("should not be able to move into check", () => {
    const Q = new Queen(b, "white", { x: 2, y: 1 });
    const q = new Queen(b, "black", { x: 4, y: 3 });
    const Q2 = new Queen(b, "white", { x: 5, y: 3 });
    b.setSquare(Q.getPosition(), Q);
    b.setSquare(q.getPosition(), q);
    b.setSquare(Q2.getPosition(), Q2);

    expect(b.moveEndangersKing(k, { x: 2, y: 3 })).toBeTruthy();
    expect(b.moveEndangersKing(q, { x: 4, y: 7 })).toBeTruthy();
  });
});
