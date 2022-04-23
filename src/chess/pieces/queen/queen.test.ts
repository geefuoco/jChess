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

  it("should create a capture move when an enemy piece is there", () => {
    const piece = new Queen(board, "white", { x: 2, y: 4 });
    board.setSquare(piece.getPosition(), piece);
    const moves = q.generateMoveSet();
    const captureMove = moves.filter((move) => {
      const pos = move.getGoalPosition();
      return pos.x === piece.getPosition().x && pos.y === piece.getPosition().y;
    })[0];
    expect(captureMove.constructor.name).toBe("Capture");
  });

  it("should not move beyond a piece", () => {
    const queen = new Queen(board, "white", { x: 7, y: 0 });
    const testPieces = [
      new Queen(board, "white", { x: 6, y: 0 }),
      new Queen(board, "white", { x: 7, y: 1 }),
      new Queen(board, "white", { x: 6, y: 1 })
    ];

    testPieces.forEach((piece: Queen) =>
      board.setSquare(piece.getPosition(), piece)
    );

    const moveSet = queen.generateMoveSet();
    expect(moveSet.length).toBe(0);
  });
});
