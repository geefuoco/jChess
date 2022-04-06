import { Bishop } from "./bishop";
import { ChessBoard } from "../../board/chessboard";

describe("Bishop", () => {
  let b: Bishop;
  let board: ChessBoard;
  beforeEach(() => {
    board = new ChessBoard();
    b = new Bishop(board, "white", { x: 4, y: 4 });
  });

  it("should generate the correct moves", () => {
    const moves = b.generateMoveSet();
    expect(moves.length).toBe(13);
  });
});
