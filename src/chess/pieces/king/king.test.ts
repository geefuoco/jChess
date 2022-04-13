import { King } from "./king";
import { ChessBoard } from "../../board/chessboard";

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
});
