import { ChessBoard } from "../../board/chessboard";
import { Knight } from "./knight";

describe("Knight", () => {
  let k: Knight;
  let board: ChessBoard;

  beforeEach(() => {
    board = new ChessBoard();
    k = new Knight(board, "white", { x: 0, y: 1 });
  });

  it("should generate the correct number of moves", () => {
    const moves = k.generateMoveSet();
    expect(moves.length).toBe(3);
  });
});
