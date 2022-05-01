import { Pawn } from "../pieces/pawn/pawn";
import { ChessBoard } from "./chessboard";

describe("ChessBoard", () => {
  let board: ChessBoard;
  beforeEach(() => (board = new ChessBoard()));

  it("should move the piece to the correct position", () => {
    const position = { x: 6, y: 2 };
    const p = new Pawn(board, "white", position);
    board.setSquare(position, p);
    const newPos = { x: 5, y: 2 };

    board.move(p, newPos);
    expect(board.getSquare(newPos)).toBe(p);
    expect(board.getSquare(position)).toBeNull();
  });
});
