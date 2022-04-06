import { ChessBoard } from "../../board/chessboard";
import { Queen } from "./queen";

describe("Queen", () => {
  let q: Queen;
  let board: ChessBoard;
  beforeEach(() => {
    board = new ChessBoard();
    q = new Queen(board, "black", { x: 1, y: 4 });
  });

  it("should generate the correct number of moves", () => {
    const moves = q.generateMoveSet();
    expect(moves.length).toBe(23);
  });
});
